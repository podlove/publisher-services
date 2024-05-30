defmodule Publisher.WordPress.Podcast do
  require Logger

  alias Publisher.WordPress.API

  def feed_url(headers) do
    site = get_header_value(headers,"wordpress-site")

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

  def save_podcast_data(headers, body) do
    Logger.log(:info, "Podcast.save_podcast_data")

    name = body["name"]
    description = body["description"]
    author = body["author"]
    language = body["language"]
    category = body["category"]
    explicit = body["explicit"]

    podlove_body = %{
      title: name,
      summary: description,
      author_name: author,
      language: language,
      category: category,
      explicit: explicit
    }

    # Logger.log(:info, "user: #{user}, endpoint: #{site}/wp-json/podlove/v2/podcast")

    Logger.log(
      :info,
      "body { title: #{name}, summary: #{description}, author: #{author}, language: #{language}, category: #{category}, expicit: #{explicit} }"
    )

    req = API.new(headers)

    with {:ok, response} <- Req.post(req, url: "podlove/v2/podcast", json: podlove_body),
         {:ok, _} <- extract_status(response) do
      {:ok, response.body}
    else
      error -> error
    end
  end

  def save_podcast_image(headers, body) do
    base64_image = body["base64Data"]
    image_name = body["name"]
    image_type = body["type"]

    # Logger.log(:info, "user: #{user}, endpoint: #{site}/wp-json/wp/v2/media")
    Logger.log(:info, "body { name: #{image_name}, type: #{image_type} }")

    image_data = Base.decode64!(base64_image)

    req = API.new(headers)

    case Req.post(req,
           url: "wp/v2/media",
           headers: [
             {"Content-Type", "image/" <> image_type},
             {"Content-Disposition", "attachment; filename=\"" <> image_name <> "\""}
           ],
           body: image_data
         ) do
      {:ok, response} ->
        with {:ok, _} <- extract_status(response),
             {:ok, source_url} <- extract_source_url(response),
             {:ok, info} <- save_podcast_image_url(req, source_url) do
          {:ok, info}
        else
          error -> error
        end

      _ ->
        {:error, "Image upload failed"}
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

  defp extract_source_url(response) do
    case response do
      %Req.Response{body: body} ->
        source_url = Map.get(body, "source_url")
        {:ok, source_url}

      _ ->
        {:error, "Image upload failed"}
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

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
