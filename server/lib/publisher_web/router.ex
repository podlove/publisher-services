defmodule PublisherWeb.Router do
  use Plug.Router

  alias PublisherWeb.Controllers.API

  plug :match
  plug :dispatch

  get "/api/v1/fetch_feed" do
    API.fetch_feed(conn, conn.params)
  end

  get "/api/v1/fetch_episode" do
    API.fetch_episode(conn, conn.params)
  end

  get "/api/v1/podcast_feed_url" do
    API.podcast_feed_url(conn, conn.req_headers)
  end

  post "/api/v1/save_podcast" do
    API.save_podcast(conn, conn.req_headers, conn.params)
  end

  post "/api/v1/save_podcast_image" do
    API.save_podcast_image(conn, conn.req_headers, conn.params)
  end

  post "/api/v1/copy_podcast_image" do
    API.copy_podcast_image(conn, conn.req_headers, conn.params)
  end

  post "/api/v1/import_episode" do
    API.import_episode(conn, conn.params)
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end
