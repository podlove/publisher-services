defmodule Publisher.WordPress.API do
  @doc """
  Returns new request struct, setup to talk to WordPress.

  ## Example

    req = API.new(headers)
    {:ok, response} = Req.get(req, url: "podlove/v2/episodes")

  """
  def new(headers, opts \\ []) do
    user = get_header_value(headers, "wordpress-user")
    password = get_header_value(headers, "wordpress-password")
    site = get_header_value(headers, "wordpress-site")
    rest_endpoint = get_header_value(headers, "wordpress-rest")

    default_connect_options = [transport_opts: [verify: :verify_none]]
    http1 = Keyword.get(opts, :http1, false)

    connect_options =
      if http1 do
        Keyword.put(default_connect_options, :protocols, [:http1])
      else
        default_connect_options
      end

    Req.new(
      base_url: rest_endpoint <> "/",
      headers: [{"Content-Type", "application/json"}],
      auth: {:basic, user <> ":" <> password},
      connect_options: connect_options
    )
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
