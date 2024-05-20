defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.Wordpress
  alias Publisher.Wordpress.Podcast

  def fetch_feed(conn, %{"url" => url}) do
    {:ok, result} = FeedParser.parse_by_url(url)

    json(conn, result)
  end

  def fetch_feed(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end

  def save_podcast(conn, headers, body) do
    with {:ok, valid_body} <- Wordpress.validate_podcast(headers, body),
         {:ok, data} <- Podcast.save_podcast_data(headers, valid_body) do
      json(conn, data)
    else
      {:error, reason} ->
        send_resp(conn, 400, "Error:  #{reason}")
    end
  end

  def save_podcast_image(conn, headers, body) do
    with {:ok, valid_body} <- Wordpress.validate_podcast_image(headers, body),
         {:ok, info} <- Podcast.save_podcast_image(headers, valid_body) do
      json(conn, info)
    else
      {:error, reason} ->
        send_resp(conn, 400, "Error:  #{reason}")
    end
  end

  def import_episode(conn, params) do
    headers = conn.req_headers

    user = get_header_value(headers, "wordpress-user")
    password = get_header_value(headers, "wordpress-password")
    site = get_header_value(headers, "wordpress-site")

    req =
      Req.new(
        base_url: site <> "/wp-json/",
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [transport_opts: [verify: :verify_none]]
      )

    # TODO: build "find episode by guid" in publisher API
    # TODO: ... and output guid in episode metadata
    # TODO: ... and make the guid writable

    # try to find existing episode

    guid = params["guid"]

    {:ok, existing_episode_result} =
      Req.get(req, url: "podlove/v2/episodes", params: %{guid: guid, status: "all"})

    existing_episode_id =
      case existing_episode_result.body["results"] do
        [%{"id" => existing_id}] -> existing_id
        _ -> nil
      end

    episode_id =
      case existing_episode_id do
        nil ->
          # CREATE EPISODE
          {:ok, create_episode_response} = Req.post(req, url: "podlove/v2/episodes")

          episode_id = create_episode_response.body["id"]
          IO.inspect("episode created. id: #{episode_id}")
          episode_id

        episode_id ->
          IO.inspect("found existing episode. id: #{episode_id}")
          episode_id
      end

    # Fetch episode, so we get the post_id
    # TODO: can be skipped if we return the post_id in the CREATE response
    {:ok, fetched_episode_response} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")

    episode = fetched_episode_response.body
    post_id = episode["post_id"]

    # Now we write the episode meta.
    {:ok, updated_episode} =
      Req.post(req,
        url: "podlove/v2/episodes/#{episode_id}",
        json: %{
          guid: params["guid"],
          title: params["title"],
          subtitle: params["subtitle"],
          summary: params["summary"],
          number: params["number"],
          explicit: params["explicit"],
          slug: params["slug"],
          duration: params["duration"],
          type: params["type"] || "full"
          # episode_poster
        }
      )

    # # Now what's really interesting is the enclosure. And actually taking the values from the params.
    # # And then maybe handling the guid so I don't keep flooding the dev database :)

    # enclosure = params["enclosure"]

    json(conn, %{status: "success"})
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
