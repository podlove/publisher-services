defmodule Publisher.WordPress.Episode do
  alias Publisher.WordPress.API

  def save(conn, params) do
    req = API.new(conn.req_headers)

    episode_id = find_or_create_episode(req, params["guid"])

    # Fetch episode, so we get the post_id
    # TODO: can be skipped if we return the post_id in the CREATE response
    {:ok, %Req.Response{body: episode}} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")

    post_id = episode["post_id"]

    # Now we write the episode meta.
    {:ok, _updated_episode} =
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

    enclosure_url = params["enclosure"]

    ext = extension_from_url(enclosure_url)

    filename = [params["slug"], ext] |> Enum.join(".")

    {:ok, resp} = Req.get(enclosure_url)

    {:ok, upload} =
      Req.post(req,
        url: "wp/v2/media",
        params: [post: post_id],
        headers: [
          {"Content-Type", content_type(resp)},
          {"Content-Disposition", "attachment; filename=\"" <> filename <> "\""}
        ],
        body: resp.body
      )

    if upload.body["generated_slug"] != params["slug"] do
      # TODO: use the generated_slug for the episode, in case there are
      # duplicates. Otherwise the url will point to a wrong audio file.
    end

    {:ok, assets} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}/media")
    asset_ids = Enum.map(assets.body["results"], & &1["asset_id"])

    verify_results =
      Enum.map(asset_ids, fn asset_id ->
        {:ok, result} =
          Req.post(req, url: "podlove/v2/episodes/#{episode_id}/media/#{asset_id}/verify")

        {result.status, result.body}
      end)

    :ok
  end

  def content_type(resp) do
    case Req.Response.get_header(resp, "content-type") do
      [content_type] -> content_type
      _ -> "audio/mpeg"
    end
  end

  def extension_from_url(url) do
    %URI{path: path} = URI.parse(url)

    path
    |> Path.extname()
    |> String.trim_leading(".")
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
