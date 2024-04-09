defmodule Publisher.BackendWeb.DemoController do
  require Logger
  use Publisher.BackendWeb, :controller

  def index(conn, _params) do
    [user | _] = get_req_header(conn, "wordpress-user")
    [password | _] = get_req_header(conn, "wordpress-password")
    [site | _] = get_req_header(conn, "wordpress-site")

    Logger.log(
      :info,
      "user: #{user}, password: #{password}, endpoint: #{site}/wp-json/podlove/v2/contributors?filter=all"
    )

    # - /podlove/v2/contributors?filter=all is one of the few reading routes that requires authentication
    # - the [verify: :verify_none] opt avoids SSL checks (which are not working for "Local" setups)
    response =
      Req.get!(site <> "/wp-json/podlove/v2/contributors?filter=all",
        auth: {:basic, user <> ":" <> password},
        connect_options: [transport_opts: [verify: :verify_none]]
      )

    json(conn, response.body)
  end
end
