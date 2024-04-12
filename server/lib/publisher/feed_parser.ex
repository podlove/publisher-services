defmodule Publisher.FeedParser do
  def parse_by_url(url) do
    podcast = Metalove.get_podcast(url)
    feed = Metalove.PodcastFeed.get_by_feed_url(podcast.main_feed_url)

    episodes =
      feed.episodes
      |> Enum.map(&Metalove.Episode.get_by_episode_id/1)
      |> Enum.map(fn episode ->
        %{
          title: episode.title,
          guid: episode.guid
        }
      end)

    {:ok,
     %{
       podcast: %{
         title: feed.title,
         description: feed.description,
         image: feed.image_url,
         owner: feed.owner,
         categories: feed.categories,
         language: feed.language,
         explicit: feed.explicit,
         copyright: feed.copyright
       },
       episodes: episodes
     }}
  end
end
