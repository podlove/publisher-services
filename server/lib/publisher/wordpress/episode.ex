defmodule Publisher.WordPress.Episode do
  alias Publisher.Wordpress.API

  def save(conn, params) do
    req = API.new(conn)

    episode_id = find_or_create_episode(req, params["guid"])

    # Fetch episode, so we get the post_id
    # TODO: can be skipped if we return the post_id in the CREATE response
    {:ok, %Req.Response{body: episode}} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")

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

    # Now what's really interesting is the enclosure. And actually taking the values from the params.

    # enclosure = params["enclosure"]
  end

  # Finds episode by guid. Creates episode with that episode if none exists.
  # Returns episode id.
  defp find_or_create_episode(req, guid) do
    {:ok, episode} =
      Req.get(
        req,
        url: "podlove/v2/episodes",
        params: %{guid: guid, status: "all"}
      )

    existing_episode_id =
      case episode.body["results"] do
        [%{"id" => existing_id}] -> existing_id
        _ -> nil
      end

    case existing_episode_id do
      nil ->
        {:ok, episode} = Req.post(req, url: "podlove/v2/episodes")
        episode.body["id"]

      episode_id ->
        episode_id
    end
  end
end
