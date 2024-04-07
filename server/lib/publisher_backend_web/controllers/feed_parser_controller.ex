defmodule Publisher.BackendWeb.FeedParserController do
  use Publisher.BackendWeb, :controller

  alias Publisher.Backend.FeedParser

  def index(conn, %{"url" => url}) do
    {:ok, result} = FeedParser.parse_by_url(url)

    json(conn, result)
  end

  def index(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end
end
