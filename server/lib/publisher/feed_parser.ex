defmodule Publisher.FeedParser do
  @opts_schema [
    force_refresh: [
      type: :boolean,
      default: false
    ],
    skip_episode_scraping: [
      type: :boolean,
      default: false
    ]
  ]

  def parse_by_url(url, opts \\ []) do
    opts = NimbleOptions.validate!(opts, @opts_schema)

    podcast = Metalove.get_podcast(url, skip_cache: opts[:force_refresh])
    feed = Metalove.PodcastFeed.get_by_feed_url(podcast.main_feed_url)

    unless opts[:skip_episode_scraping] do
      Metalove.PodcastFeed.trigger_episode_metadata_scrape(feed)
    end

    episodes =
      feed.episodes
      |> Enum.map(&Metalove.Episode.get_by_episode_id/1)
      |> Enum.map(fn episode ->
        %{
          title: episode.title,
          guid: episode.guid,
          pub_date: episode.pub_date,
          enclosure: episode.enclosure
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

    number =
      case Integer.parse(episode.episode) do
        {num, _} -> num
        :error -> nil
      end

    # TODO: slug. Parse file name from (resolved) url. I think I wanted to resolve the url anyway.
    # TODO: make use of scraped media file values as fallback

    {:ok,
     %{
       episode: %{
         guid: episode.guid,
         title: episode.title,
         subtitle: episode.subtitle,
         summary: episode.summary,
         content: episode.content_encoded,
         number: number,
         slug: slug(episode),
         type: episode.type,
         explicit: explicit(episode),
         media_file: %{
           url: episode.enclosure.resolved_url || episode.enclosure.url,
           content_length: episode.enclosure.size,
           type: episode.enclosure.type
         },
         chapters: episode.chapters,
         transcript: transcript(episode),
         contributors: episode.contributors
       }
     }}
  end

  defp slug(episode) do
    url = episode.enclosure.resolved_url || episode.enclosure.url || ""
    %URI{path: path} = URI.parse(url)

    case path do
      nil ->
        Slug.slugify(episode.title)

      path ->
        path
        |> Path.basename()
        |> Path.rootname()
        |> Slug.slugify()
    end
  end

  defp explicit(%{explicit: explicit}) when is_binary(explicit) do
    case String.downcase(explicit) do
      "true" -> true
      "false" -> false
      _ -> nil
    end
  end

  defp explicit(_episode) do
    nil
  end

  defp transcript(%{transcript_urls: []}), do: nil

  defp transcript(%{transcript_urls: urls}) do
    case Enum.find(urls, &(&1.type == "text/vtt")) do
      nil -> hd(urls)
      url -> url
    end
  end
end
