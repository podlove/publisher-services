defmodule Publisher.WordPress.API do
  @doc """
  Returns new request struct, setup to talk to WordPress.

  ## Example

    req = API.new(headers, http1)
    {:ok, response} = Req.get(req, url: "podlove/v2/episodes")

  """
  def new(headers, http1) do
    user = get_header_value(headers, "wordpress-user")
    password = get_header_value(headers, "wordpress-password")
    site = get_header_value(headers, "wordpress-site")

    if (http1) do
      Req.new(
        base_url: site <> "/wp-json/",
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [
          transport_opts: [verify: :verify_none]
        ]
      )
    else
      Req.new(
        base_url: site <> "/wp-json/",
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [
          protocols: [:http1],
          transport_opts: [verify: :verify_none]
        ]
      )
      end
  end

  defp get_header_value(headers, header_item) do
    case Enum.find(headers, fn {name, _} -> name == header_item end) do
      nil -> nil
      {_, value} -> value
    end
  end
end
