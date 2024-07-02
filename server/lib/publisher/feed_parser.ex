defmodule Publisher.FeedParser do
  def parse_by_url(url, force_refresh: force_refresh) do
    podcast = Metalove.get_podcast(url, skip_cache: force_refresh)
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
         guid: feed.guid,
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

  def get_episode(feed_url, episode_guid) do
    podcast = Metalove.get_podcast(feed_url)
    id = {:episode, podcast.main_feed_url, episode_guid}
    episode = Metalove.Episode.get_by_episode_id(id)

    {:ok,
     %{
       episode: %{
         guid: episode.guid,
         title: episode.title,
         subtitle: episode.subtitle,
         summary: episode.summary,
         content: episode.content_encoded,
         media_file: %{
           url: episode.enclosure.url,
           content_length: episode.enclosure.size,
           type: episode.enclosure.type
         },
         chapters: episode.chapters,
         transcript: transcript(episode),
         contributors: episode.contributors
       }
     }}
  end

  defp transcript(%{transcript_urls: []}), do: nil

  defp transcript(%{transcript_urls: urls}) do
    case Enum.find(urls, &(&1.type == "text/vtt")) do
      nil -> hd(urls)
      url -> url
    end
  end
end
