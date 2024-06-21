defmodule Publisher.WordPress.Media do
  require Logger

  def upload_media_from_url(req, url, slug) do
    ext = extension_from_url(url)
    filename = [slug, ext] |> Enum.join(".")

    {:ok, resp} = Req.get(url)

    case Req.post(req,
           url: "wp/v2/media",
           headers: [
             {"Content-Type", content_type(resp)},
             {"Content-Disposition", "attachment; filename=\"" <> filename <> "\""}
           ],
           body: resp.body
         ) do
      {:ok, response} ->
        with {:ok, _} <- extract_status(response),
             {:ok, source_url} <- extract_source_url(response) do
          {:ok, source_url}
        else
          error -> error
        end

      _ ->
        {:error, "Media upload failed"}
    end
  end

  def upload_image(req, image, image_name, image_type) do
    image_data = Base.decode64!(image)

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
             {:ok, source_url} <- extract_source_url(response) do
          {:ok, source_url}
        else
          error -> error
        end

      _ ->
        {:error, "Image upload failed"}
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
end
