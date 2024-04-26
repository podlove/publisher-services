defmodule PublisherWeb.Router do
  use Plug.Router

  alias PublisherWeb.Controllers.API

  plug :match
  plug :dispatch

  get "/api/v1/fetch_feed" do
    API.fetch_feed(conn, conn.params)
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end
