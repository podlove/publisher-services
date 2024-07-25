defmodule Publisher.WordPress.Episode do
  alias Publisher.WordPress.API
  require Logger

  def save(conn, params) do
    req = API.new(conn.req_headers)

    with episode_id <- find_or_create_episode(req, params["guid"]),
         post_id <- fetch_post_id(req, episode_id),
         {:ok, _} <- write_episode_meta(req, episode_id, params),
         :ok <- upload_content(req, post_id, params),
         :ok <- upload_media(req, episode_id, post_id, params),
         :ok <- upload_chapters(req, episode_id, params),
         :ok <- upload_transcript(req, episode_id, params),
         :ok <- upload_contributors(req, episode_id, params),
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

    Logger.info("Find or create episode: #{guid} -> #{existing_episode_id}")

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
      |> reject_empty_values()
      |> Enum.into(%{})

    Logger.info("post podlove/v2/episode/#{episode_id}")

    Req.post(req,
      url: "podlove/v2/episodes/#{episode_id}",
      json: payload
    )
  end

  defp reject_empty_values(map) do
    Enum.reject(map, fn {_, v} -> is_nil(v) end)
  end

  defp upload_content(req, post_id, %{"content" => content} = _params)
       when not is_nil(content) do
    Logger.info("Episode post #{post_id} content is #{content}")

    payload = %{
      content: content
    }

    Req.post(req,
      url: "wp/v2/episodes/#{post_id}",
      json: payload
    )

    :ok
  end

  defp upload_content(_req, _post_id, params) do
    Logger.info("Episode has no post content #{params}")
    :ok
  end

  defp upload_chapters(req, episode_id, %{"chapters" => chapters} = _params)
       when is_list(chapters) and length(chapters) > 0 do
    Logger.info("Episode has #{length(chapters)} chapters: #{episode_id}")

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
    Logger.info("Episode has no chapters: #{episode_id}")
    :ok
  end

  defp upload_transcript(req, episode_id, %{
         "transcript" => %{"url" => url, "type" => type} = transcript
       })
       when not is_nil(url) and not is_nil(type) do
    Logger.info("Episode has a transcript: #{episode_id} (#{url})")

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
        Logger.info("Transcript type #{type} is not supported")
    end

    :ok
  end

  defp upload_transcript(_req, episode_id, _params) do
    Logger.info("Episode has no transcript: #{episode_id}")
    :ok
  end

  defp upload_contributors(req, episode_id, %{"contributors" => contributors} = _param)
       when is_list(contributors) and length(contributors) > 0 do
    Logger.info("Episode has #{length(contributors)} contributors: #{episode_id}")

    with {:ok, contributor_ids} <- find_or_create_contributors(req, contributors),
         :ok <- add_contributors_to_episode(req, episode_id, contributor_ids) do
      :ok
    else
      error -> error
    end
  end

  defp upload_contributors(_req, episode_id, _params) do
    Logger.info("Episode has no contributors: #{episode_id}")
    :ok
  end

  defp is_contributor_exist?(name, existing_contributors) do
    Enum.find(existing_contributors, fn contributor ->
      name == contributor["realname"] or name == contributor["nickname"] or
        name == contributor["publicname"]
    end)
  end

  defp set_attr_contributor(req, id, name) do
    payload = %{
      publicname: name,
      visibility: "yes"
    }

    {:ok, _} =
      Req.put(req,
        url: "podlove/v2/contributors/#{id}",
        json: payload
      )
  end

  defp create_contributor(req, name) do
    with {:ok, contributor} <- Req.post(req, url: "podlove/v2/contributors"),
         id <- contributor.body["id"],
         {:ok, _} <- set_attr_contributor(req, id, name) do
      {:ok, id}
    else
      :error -> :error
    end
  end

  defp find_or_create_contributors(req, contributors) do
    {:ok, %Req.Response{body: %{"contributors" => exist_contributors}}} =
      Req.get(
        req,
        url: "podlove/v2/contributors",
        params: %{filter: "all"}
      )

    ids =
      Enum.reduce(contributors, [], fn contributor, acc ->
        name = Map.fetch!(contributor, "name")
        # uri = Map.get(contributor, "uri", nil)
        case is_contributor_exist?(name, exist_contributors) do
          nil ->
            case create_contributor(req, name) do
              {:ok, id} -> [id | acc]
              {:error, reason} -> Logger.info("Couldn't create a contributor: #{reason}")
            end

          exist_contributor ->
            id = String.to_integer(exist_contributor["id"])
            [id | acc]
        end
      end)

    {:ok, Enum.reverse(ids)}
  end

  defp add_contributors_to_episode(req, episode_id, contributor_ids) do
    contributions =
      Enum.with_index(contributor_ids, 1)
      |> Enum.map(fn {id, index} -> %{contributor_id: id, position: index} end)

    payload = %{
      contributors: contributions
    }

    Req.patch(req,
      url: "podlove/v2/episodes/#{episode_id}/contributions",
      json: payload
    )

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
      Logger.info(
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

      Logger.info("podlove/v2/episodes/#{episode_id}/media/#{asset_id}/verify")

      # TODO: What should we verify here? Just that result.status == 200? Because
      # there might be more than just one asset, so we don't know which one MUST have
      # a size. Unless we figure that out beforehand.
    end)

    :ok
  end
end
