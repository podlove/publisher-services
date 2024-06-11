defmodule Publisher.WordPress do
  require Logger

  def validate_podcast_image(body) do
    with {:ok, _} <- ensure_podcast_image(body) do
      {:ok, body}
    else
      error -> error
    end
  end

  defp ensure_podcast_image(%{"name" => _, "base64Data" => _, "type" => _} = body) do
    {:ok, body}
  end

  defp ensure_podcast_image(_) do
    {:error, "Missing podcast cover data"}
  end
end
