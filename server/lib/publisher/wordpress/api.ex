defmodule Publisher.Wordpress.API do
  @doc """
  Returns new request struct, setup to talk to WordPress.

  ## Example

    req = API.new(conn)
    {:ok, response} = Req.get(req, url: "podlove/v2/episodes")

  """
  def new(conn) do
    headers = conn.req_headers

    user = get_header_value(headers, "wordpress-user")
    password = get_header_value(headers, "wordpress-password")
    site = get_header_value(headers, "wordpress-site")

    Req.new(
      base_url: site <> "/wp-json/",
      headers: [{"Content-Type", "application/json"}],
      auth: {:basic, user <> ":" <> password},
      connect_options: [transport_opts: [verify: :verify_none]]
    )
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
