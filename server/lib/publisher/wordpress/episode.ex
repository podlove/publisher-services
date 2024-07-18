defmodule Publisher.WordPress.Episode do
  alias Publisher.WordPress.API
  require Logger

  def save(conn, params) do
    req = API.new(conn.req_headers)

    with episode_id <- find_or_create_episode(req, params["guid"]),
         post_id <- fetch_post_id(req, episode_id),
         {:ok, _} <- write_episode_meta(req, episode_id, params),
         :ok <- upload_media(req, episode_id, post_id, params),
         :ok <- upload_chapters(req, episode_id, params),
         :ok <- upload_transcript(req, episode_id, params),
         :ok <- verify_media(req, episode_id) do
      :ok
    else
      error -> error
    end
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

    Logger.log(:info, "Find or create epiosde: #{guid} -> #{existing_episode_id}")

    case existing_episode_id do
      nil ->
        {:ok, episode} = Req.post(req, url: "podlove/v2/episodes")
        episode.body["id"]

      episode_id ->
        episode_id
    end
  end

  # TODO: can be skipped if we return the post_id in the CREATE response
  defp fetch_post_id(req, episode_id) do
    {:ok, %Req.Response{body: episode}} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")
    episode["post_id"]
  end

  defp write_episode_meta(req, episode_id, params) do
    payload =
      %{
        guid: params["guid"],
        title: params["title"],
        subtitle: params["subtitle"],
        summary: params["summary"],
        number: params["number"],
        explicit: params["explicit"],
        slug: params["slug"],
        duration: params["duration"],
        type: params["type"] || "full"
      }
      # Filtere alle Felder, die nil sind
      |> Enum.filter(fn {_, v} -> not is_nil(v) end)
      |> Enum.into(%{})

    Logger.log(:info, "post podlove/v2/episode/#{episode_id}")

    Req.post(req,
      url: "podlove/v2/episodes/#{episode_id}",
      json: payload
    )
  end

  defp upload_chapters(req, episode_id, %{"chapters" => chapters} = _params)
       when is_list(chapters) and length(chapters) > 0 do
    Logger.log(:info, "Chapters exist and now transfered: #{episode_id}")
    Logger.log(:info, "chapters elements: #{length(chapters)}")

    payload = %{
      chapters: chapters
    }

    Req.post(req,
      url: "podlove/v2/chapters/#{episode_id}",
      json: payload
    )

    :ok
  end

  defp upload_chapters(_req, episode_id, _params) do
    Logger.log(:info, "Chapters not existed: #{episode_id}")
    :ok
  end

  defp upload_transcript(req, episode_id, %{
         "transcript" => %{"url" => url, "type" => type} = transcript
       })
       when not is_nil(url) and not is_nil(type) do
    Logger.log(:info, "Transcript exist and now transfered: #{episode_id}")
    Logger.log(:info, "transcript content: #{url}")

    case type do
      "text/vtt" ->
        {:ok, resp} = Req.get(transcript["url"])

        payload = %{
          type: "vtt",
          content: resp.body
        }

        Req.post(req,
          url: "podlove/v2/transcripts/#{episode_id}",
          json: payload
        )

      _ ->
        Logger.log(:info, "Transcript type #{type} is not supported")
    end

    :ok
  end

  defp upload_transcript(_req, episode_id, _params) do
    Logger.log(:info, "Transcript not existed: #{episode_id}")
    :ok
  end

  defp upload_media(req, _episode_id, post_id, params) do
    enclosure_url = params["media_file"]["url"]
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
      Logger.log(
        :info,
        "generated_slug (#{upload.body["generated_slug"]} and slug (#{params["slug"]}) parameter are different"
      )

      # TODO: use the generated_slug for the episode, in case there are
      # duplicates. Otherwise the url will point to a wrong audio file.
    end

    :ok
  end

  defp verify_media(req, episode_id) do
    {:ok, assets} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}/media")
    asset_ids = Enum.map(assets.body["results"], & &1["asset_id"])

    Enum.map(asset_ids, fn asset_id ->
      {:ok, _result} =
        Req.post(req, url: "podlove/v2/episodes/#{episode_id}/media/#{asset_id}/verify")

      Logger.log(:info, "podlove/v2/episodes/#{episode_id}/media/#{asset_id}/verify")

      # TODO: What should we verify here? Just that result.status == 200? Because
      # there might be more than just one asset, so we don't know which one MUST have
      # a size. Unless we figure that out beforehand.
    end)

    :ok
  end
end
