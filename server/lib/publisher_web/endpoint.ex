defmodule PublisherWeb.Endpoint do
  use Plug.Builder

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Jason

  plug :fetch_query_params

  plug PublisherWeb.Router
end
