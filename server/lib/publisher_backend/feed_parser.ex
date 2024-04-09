defmodule Publisher.Backend.FeedParser do
  def parse_by_url(url) do
    podcast = Metalove.get_podcast(url)
    feed = Metalove.PodcastFeed.get_by_feed_url(podcast.main_feed_url)
    episodes = Enum.map(feed.episodes, &Metalove.Episode.get_by_episode_id/1)

    {:ok,
     %{
       podcast: %{
         title: feed.title,
         description: feed.description,
         image: feed.image_url,
         owner: feed.owner,
         categories: feed.categories,
         language: feed.language
       },
       episodes: episodes
     }}
  end
end
