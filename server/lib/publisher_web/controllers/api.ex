defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser

  def fetch_feed(conn, %{"url" => url}) do
    {:ok, result} = FeedParser.parse_by_url(url)

    json(conn, result)
  end

  def fetch_feed(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end
end
