defmodule Publisher.BackendWeb.FeedParserController do
  use Publisher.BackendWeb, :controller

  def index(conn, %{"url" => url}) do
    podcast = Metalove.get_podcast(url)
    feed = Metalove.PodcastFeed.get_by_feed_url(podcast.main_feed_url)
    episodes = Enum.map(feed.episodes, &Metalove.Episode.get_by_episode_id/1)

    json(conn, %{
      feed: Map.drop(feed, [:episodes, :waiting_for_pages]),
      episodes: episodes
    })
  end

  def index(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end
end
