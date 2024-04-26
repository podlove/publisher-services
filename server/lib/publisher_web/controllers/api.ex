defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.Wordpress
  alias Publisher.Wordpress.Podcast

  def fetch_feed(conn, %{"url" => url}) do
    {:ok, result} = FeedParser.parse_by_url(url)

    json(conn, result)
  end

  def fetch_feed(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end

  def save_podcast(conn, _) do
    body = conn.params

    case Wordpress.parse_validate(body) do
      {:ok, valid_body} ->
        result = Podcast.put_podcast_data(valid_body)
        case result do
          {:ok, _} ->
            json(conn, "ok")
          {:error, reason} ->
            json(conn, reason[:reason])
        end
      {:error, reason} ->
        send_resp(conn, 400, "Error: #{reason}")
    end
  end
end
