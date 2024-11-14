defmodule URLEncoder do
  @doc """
  Encodes a URL if it's not already encoded.
  Returns {:ok, encoded_url} if successful, {:error, reason} otherwise.

  ## Examples

      iex> URLEncoder.encode("https://example.com/path with spaces")
      {:ok, "https://example.com/path%20with%20spaces"}

      iex> URLEncoder.encode("https://example.com/path%20already%20encoded")
      {:ok, "https://example.com/path%20already%20encoded"}

  """
  def maybe_encode(url) when is_binary(url) do
    cond do
      already_encoded?(url) ->
        {:ok, url}

      valid_url?(url) ->
        {:ok, URI.encode(url)}

      true ->
        {:error, "Invalid URL format"}
    end
  end

  def maybe_encode(_), do: {:error, "URL must be a string"}

  defp already_encoded?(url) do
    String.match?(url, ~r/%[0-9A-Fa-f]{2}/)
  end

  defp valid_url?(url) do
    uri = URI.parse(url)
    !is_nil(uri.scheme) && !is_nil(uri.host)
  end
end
