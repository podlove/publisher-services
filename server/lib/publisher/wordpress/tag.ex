defmodule Publisher.WordPress.Tag do

  alias Publisher.WordPress.Episode
  alias Publisher.WordPress.API

  def add_tag_episode(conn, params) do
    req = API.new(conn.req_headers)

    with episode_id <- Episode.find_episode(req, params["guid"]),
         :ok <- maybe_add_tag(req, episode_id, params) do
      :ok
    else
      error -> error
    end
  end

  defp fetch_post_id(req, episode_id) do
    {:ok, %Req.Response{body: episode}} = Req.get(req, url: "podlove/v2/episodes/#{episode_id}")
    episode["post_id"]
  end

  defp maybe_add_tag(_req, nil, _params) do
    :ok
  end

  defp maybe_add_tag(req, episode_id, params) do
    with post_id <- fetch_post_id(req, episode_id),
         :ok <- add_tag(req, post_id, params) do
      :ok
    else
      error -> error
    end
  end

  defp add_tag(req, post_id, params) do
    tag_name = params["tag"]
    with tag_id <- find_or_create_tag(req, tag_name),
         :ok <- add_tag_to_episode(req, post_id, tag_id) do
      :ok
    else
      error -> error
    end
  end

  defp find_or_create_tag(req, tag_name) do
    {:ok, tags_response} =
      Req.get(
        req,
        url: "wp/v2/tags"
      )

    tag =
      Enum.find(tags_response.body, fn tag -> tag["name"] == tag_name end)

    case tag do
      nil ->
        payload = %{
          name: tag_name
        }
        {:ok, tag} = Req.post(
          req,
          url: "wp/v2/tags",
          json: payload
        )
        tag.body["id"]
      tag ->
        tag["id"]
    end
  end

  defp add_tag_to_episode(req, post_id, tag_id) do
    payload = %{
      tags: tag_id
    }
    Req.post(
      req,
      url: "wp/v2/episodes/#{post_id}",
      json: payload
    )
    :ok
  end
end
