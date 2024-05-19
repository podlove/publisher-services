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

    # post_payload = %{
    #   title: "LOV001 Lorem Ipsum"
    # }

    req =
      Req.new(
        base_url: site <> "/wp-json/",
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [transport_opts: [verify: :verify_none]]
      )

    # CREATE EPISODE
    {:ok, create_episode_response} = Req.post(req, url: "podlove/v2/episodes")

    episode_id = create_episode_response.body["id"]
    IO.inspect("episode created. id: #{episode_id}")

    # Fetch just created episode
    {:ok, fetched_episode_response} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")

    episode = fetched_episode_response.body
    post_id = episode["post_id"]

    # Status: we have a post+episode and their ids. Both are kind of empty.

    # Now we write the episode meta.
    {:ok, updated_episode} =
      Req.post(req,
        url: "podlove/v2/episodes/#{episode_id}",
        json: %{
          title: "LOV001 Lorem Ipsum",
          subtitle: "Talking about endangered species.",
          summary: "The most exciting episode on the planet. And the universe.",
          number: "1",
          explicit: "false",
          slug: "lov001-lorem-ipsum",
          duration: "00:00:42.123",
          type: "full"
          # episode_poster
        }
      )

    IO.inspect(updated_episode)

    json(conn, %{status: "success"})
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
