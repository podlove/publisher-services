defmodule Publisher.Wordpress.Podcast do
  def save_podcast_data(body) do
    user = body["wordpress"]["user"]
    password = body["wordpress"]["password"]
    site = body["wordpress"]["site"]
    name = body["podcast"]["name"]

    podlove_body = %{title: name}

    response =
      Req.post(site <> "/wp-json/podlove/v2/podcast",
        json: podlove_body,
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [transport_opts: [verify: :verify_none]]
      )

    case response do
      {:ok, response} ->
        {:ok, response.body}

      {:error, _} ->
        {:error, "network error"}
    end
  end

  def save_podcast_image(body) do
    user = body["wordpress"]["user"]
    password = body["wordpress"]["password"]
    site = body["wordpress"]["site"]

    base64_image = body["podcast_image"]["base64Data"]
    image_name = body["podcast_image"]["name"]
    image_type = body["podcast_image"]["type"]

    image_data = Base.decode64!(base64_image)

    case Req.post(site <> "/wp-json/wp/v2/media",
           headers: [
             {"Content-Type", "image/" <> image_type},
             {"Content-Disposition", "attachment; filename=\"" <> image_name <> "\""}
           ],
           auth: {:basic, user <> ":" <> password},
           connect_options: [transport_opts: [verify: :verify_none]],
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

  defp extract_status(response) do
    case response.status do
      201 -> {:ok, "Image upload ok"}
      _ -> {:error, "Image upload failed"}
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
