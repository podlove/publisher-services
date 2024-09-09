defmodule Publisher.WordPress.Podcast do
  require Logger

  alias Publisher.WordPress.API
  alias Publisher.WordPress.Media

  def feed_url(site) do
    case Req.get(site <> "/wp-json/podlove/v2/podcast",
           connect_options: [transport_opts: [verify: :verify_none]]
         ) do
      {:ok, response} ->
        with {:ok, _} <- extract_status(response),
             {:ok, feed_url} <- extract_feed_url(response) do
          {:ok, feed_url}
        else
          error -> error
        end

      _ ->
        {:error, "Feed url is missing"}
    end
  end

  def set_settings(headers, body) do
    Logger.info("Padcast.set_settings")

    payload =
      %{
        transcript: Map.get(body, "transcript", nil),
        contributor: Map.get(body, "contributor", nil)
      }
      |> reject_empty_values()
      |> Enum.into(%{})

    req = API.new(headers)

    with {:ok, response} <- Req.post(req, url: "podlove/v2/onboarding/setup", json: payload),
         {:ok, _} <- extract_status(response) do
      :ok
    else
      error -> error
    end
  end

  defp reject_empty_values(map) do
    Enum.reject(map, fn {_, v} -> is_nil(v) end)
  end

  def save_podcast_data(headers, body) do
    Logger.info("Podcast.save_podcast_data")

    payload = %{
      title: body.name,
      summary: body.description,
      author_name: body.author,
      language: body.language,
      category: body.category,
      explicit: body.explicit
    }

    req = API.new(headers)

    with {:ok, response} <- Req.post(req, url: "podlove/v2/podcast", json: payload),
         {:ok, _} <- extract_status(response) do
      {:ok, response.body}
    else
      error -> error
    end
  end

  def save_podcast_image(headers, body) do
    base64_image = body.base64Data
    image_name = body.name
    image_type = body.type

    # Logger.log(:info, "user: #{user}, endpoint: #{site}/wp-json/wp/v2/media")
    Logger.log(:info, "body { name: #{image_name}, type: #{image_type} }")

    req = API.new(headers, http1: true)

    with {:ok, source_url} <- Media.upload_image(req, base64_image, image_name, image_type),
         {:ok, info} <- save_podcast_image_url(req, source_url) do
      {:ok, info}
    else
      error -> error
    end
  end

  def copy_podcast_image(headers, body) do
    image_name = body.name
    image_url = body.url

    # Logger.log(:info, "user: #{user}, endpoint: #{site}/wp-json/wp/v2/media")
    Logger.log(:info, "body { name: #{image_name}, url: #{image_url} }")

    req = API.new(headers, http1: true)

    with {:ok, source_url} <- Media.upload_media_from_url(req, image_url, image_name),
         {:ok, info} <- save_podcast_image_url(req, source_url) do
      {:ok, info}
    else
      error -> error
    end
  end


  def save_podcast_image_url(req, url) do
    podlove_body = %{cover_image: url}

    # Logger.log(:info, "user: #{user}, endpoint: #{site}/wp-json/podlove/v2/podcast")
    Logger.log(:info, "body { cover_image: #{url} }")

    with {:ok, response} <- Req.post(req, url: "podlove/v2/podcast", json: podlove_body),
         {:ok, _} <- extract_status(response) do
      {:ok, response.body}
    else
      error -> error
    end
  end

  defp extract_status(response) do
    Logger.log(:info, "response  { status: #{response.status} }")

    case response.status do
      200 -> {:ok, "ok"}
      201 -> {:ok, "resource created"}
      _ -> {:error, "request failed"}
    end
  end

  defp extract_feed_url(response) do
    with %Req.Response{body: body} <- response,
         feed_urls when is_list(feed_urls) <- Map.get(body, "feeds"),
         feed_url <- process_list(feed_urls) do
      {:ok, feed_url}
    else
      _ -> {:error, "Feed url is missing or invalid"}
    end
  end

  def process_list([element]) do
    element |> Map.values() |> hd()
  end

  def process_list(list) when is_list(list) do
    search_key = "mp3"

    Enum.find(list, fn map -> Map.has_key?(map, search_key) end)
    |> case do
      nil -> list |> hd() |> Map.values() |> hd()
      result -> result |> Map.values() |> hd()
    end
  end

end
