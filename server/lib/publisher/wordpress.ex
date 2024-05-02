defmodule Publisher.Wordpress do
  def validate_podcast(body) do
    with {:ok, _} <- ensure_wordpress_data(body),
         {:ok, _} <- ensure_podcast_data(body) do
      {:ok, body}
    else
      error -> error
    end
  end

  def validate_podcast_image(body) do
    with {:ok, _} <- ensure_wordpress_data(body),
         {:ok, _} <- ensure_podcast_image(body) do
      {:ok, body}
    else
      error -> error
    end
  end

  defp ensure_wordpress_data(
         %{"wordpress" => %{"user" => _, "password" => _, "site" => _}} = body
       ) do
    {:ok, body}
  end

  defp ensure_wordpress_data(body) do
    case Map.get(body, "wordpress") do
      nil -> {:error, "Wordpress data are missing!"}
      _ -> {:error, "Missing data"}
    end
  end

  defp ensure_podcast_data(
         %{
           "podcast" => %{
             "name" => _,
             "description" => _,
             "author" => _,
             "language" => _,
             "category" => _,
             "explicit" => _
           }
         } = body
       ) do
    {:ok, body}
  end

  defp ensure_podcast_data(body) do
    case Map.get(body, "podcast") do
      nil -> {:error, "Podcast data are missing!"}
      _ -> {:error, "Missing data"}
    end
  end

  defp ensure_podcast_image(
         %{"podcast_image" => %{"name" => _, "base64Data" => _, "type" => _}} = body
       ) do
    {:ok, body}
  end

  defp ensure_podcast_image(body) do
    case Map.get(body, "podcast_image") do
      nil -> {:error, "Podcast image data are missing!"}
      _ -> {:error, "Missing data"}
    end
  end
end
