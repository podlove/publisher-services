defmodule Publisher.WordPress.Media do
  require Logger

  def upload_media_from_url(req, post_id \\ nil, url, slug) do
    ext = extension_from_url(url)
    filename = [slug, ext] |> Enum.join(".")

    {:ok, encoded_url} = URLEncoder.maybe_encode(url)
    {:ok, resp} = Req.get(encoded_url)

    response = if post_id do
      upload_media(req, post_id, filename, content_type(resp), resp.body)
    else
      upload_media(req, filename, content_type(resp), resp.body)
    end

    with {:ok, response} <- response,
         {:ok, _} <- extract_status(response),
         {:ok, source_url} <- extract_source_url(response) do
      {:ok, source_url}
    else
      error -> error
    end
  end

  def upload_image(req, image, image_name, image_type) do
    image_data = Base.decode64!(image)

    with {:ok, response} <- upload_media(req, image_name, image_type, image_data),
         {:ok, _} <- extract_status(response),
         {:ok, source_url} <- extract_source_url(response) do
      {:ok, source_url}
    else
      error -> error
    end

  end

  defp content_type(resp) do
    case Req.Response.get_header(resp, "content-type") do
      [content_type] -> content_type
      _ -> "audio/mpeg"
    end
  end

  defp extension_from_url(url) do
    %URI{path: path} = URI.parse(url)

    path
    |> Path.extname()
    |> String.trim_leading(".")
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

  defp upload_media(req, post_id, content_name, content_type, content) do
    Req.post(req,
      url: "wp/v2/media",
      params: [post: post_id],
      headers: [
        {"Content-Type", content_type},
        {"Content-Disposition", "attachment; filename=\"" <> content_name <> "\""}
      ],
      body: content
    )
  end

  defp upload_media(req, content_name, content_type, content) do
    Req.post(req,
      url: "wp/v2/media",
      headers: [
        {"Content-Type", content_type},
        {"Content-Disposition", "attachment; filename=\"" <> content_name <> "\""}
      ],
      body: content
    )
  end
end
