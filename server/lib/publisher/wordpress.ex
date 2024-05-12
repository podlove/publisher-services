defmodule Publisher.Wordpress do

  require Logger

  def validate_podcast(headers, body) do
    with {:ok, _} <- ensure_wordpress_data(headers),
         {:ok, _} <- ensure_podcast_data(body) do
      {:ok, body}
    else
      error -> error
    end
  end

  def validate_podcast_image(headers, body) do
    with {:ok, _} <- ensure_wordpress_data(headers),
         {:ok, _} <- ensure_podcast_image(body) do
      {:ok, body}
    else
      error -> error
    end
  end

  defp ensure_wordpress_data( headers ) do
    with {:ok, _} <- get_header_value(headers, "wordpress-user"),
         {:ok, _} <- get_header_value(headers, "wordpress-password"),
         {:ok, _} <- get_header_value(headers, "wordpress-site") do
      {:ok, headers}
    else
      error -> error
    end
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> {:error, "Header item #{header_item} missing"}
      {_, value} -> {:ok, value}
    end
  end

  defp ensure_podcast_data(
         %{
           "name" => _,
           "description" => _,
           "author" => _,
           "language" => _,
           "category" => _,
           "explicit" => _
         } = body
       ) do
    {:ok, body}
  end

  defp ensure_podcast_data(_) do
    {:error, "Missing podcast data"}
  end

  defp ensure_podcast_image(
         %{"name" => _, "base64Data" => _, "type" => _} = body
       ) do
    {:ok, body}
  end

  defp ensure_podcast_image(_) do
    {:error, "Missing podcast cover data"}
  end
end
