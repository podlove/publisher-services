defmodule Publisher.Wordpress.Podcast do

  require Logger

  def save_podcast_data(body) do
    user = body["wordpress"]["user"]
    password = body["wordpress"]["password"]
    site = body["wordpress"]["site"]

    name = body["podcast"]["name"]
    description = body["podcast"]["description"]
    author = body["podcast"]["author"]
    language = body["podcast"]["language"]
    category = body["podcast"]["category"]
    explicit = body["podcast"]["explicit"]

    podlove_body = %{
      title: name,
      summary: description,
      author_name: author,
      language: language,
      category: category,
      explicit: explicit
    }

    Logger.log(:info, "user: #{user}, password: #{password}, endpoint: #{site}/wp-json/podlove/v2/podcast")
    Logger.log(:info, "body { title: #{name}, summary: #{description}, author: #{author}, language: #{language}, category: #{category}, expicit: #{explicit} }")

    with {:ok, response} <- Req.post(site <> "/wp-json/podlove/v2/podcast",
           json: podlove_body,
           headers: [{"Content-Type", "application/json"}],
           auth: {:basic, user <> ":" <> password},
           connect_options: [transport_opts: [verify: :verify_none]]
         ),
         {:ok, _} <- extract_status(response) do
      {:ok, response.body}
    else
      error -> error
    end
  end

  def save_podcast_image(body) do
    user = body["wordpress"]["user"]
    password = body["wordpress"]["password"]
    site = body["wordpress"]["site"]

    base64_image = body["podcast_image"]["base64Data"]
    image_name = body["podcast_image"]["name"]
    image_type = body["podcast_image"]["type"]

    Logger.log(:info, "body { name: #{image_name}, type: #{image_type} }")

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
             {:ok, source_url} <- extract_source_url(response),
             {:ok, info} <- save_podcast_image_url(user, password, site, source_url) do
          {:ok, info}
        else
          error -> error
        end

      _ ->
        {:error, "Image upload failed"}
    end
  end

  def save_podcast_image_url(user, password, site, url) do
    podlove_body = %{cover_image: url}

    with {:ok, response} <- Req.post(site <> "/wp-json/podlove/v2/podcast",
           json: podlove_body,
           headers: [{"Content-Type", "application/json"}],
           auth: {:basic, user <> ":" <> password},
           connect_options: [transport_opts: [verify: :verify_none]]
         ),
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
end
