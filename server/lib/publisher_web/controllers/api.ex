defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.WordPress
  alias Publisher.WordPress.Episode
  alias Publisher.WordPress.Podcast

  def fetch_feed(conn, %{"url" => url}) do
    {:ok, result} = FeedParser.parse_by_url(url)

    json(conn, result)
  end

  def fetch_feed(conn, _) do
    send_resp(conn, 400, "Bad Request: url parameter missing")
  end

  def fetch_episode(conn, %{"feed_url" => feed_url, "episode_guid" => episode_guid}) do
    # TODO: should we rewrite metalove to use the podcast guid instead of the
    # podcast feed url? but then we need to guarantee / fallback to a generated
    # guid.
    {:ok, episode} = FeedParser.get_episode(feed_url, episode_guid)

    json(conn, episode)
  end

  def podcast_feed_url(conn, headers) do
    with {:ok, _} <- WordPress.validate_podcast(headers),
         {:ok, data} <- Podcast.feed_url(headers) do
      json(conn, data)
    else
      {:error, reason} ->
        send_resp(conn, 400, "Error:  #{reason}")
    end
  end

  def save_podcast(conn, headers, body) do
    with {:ok, valid_body} <- WordPress.validate_podcast(headers, body),
         {:ok, data} <- Podcast.save_podcast_data(headers, valid_body) do
      json(conn, data)
    else
      {:error, reason} ->
        send_resp(conn, 400, "Error:  #{reason}")
    end
  end

  def save_podcast_image(conn, headers, body) do
    with {:ok, valid_body} <- WordPress.validate_podcast_image(headers, body),
         {:ok, info} <- Podcast.save_podcast_image(headers, valid_body) do
      json(conn, info)
    else
      {:error, reason} ->
        send_resp(conn, 400, "Error:  #{reason}")
    end
  end

  def import_episode(conn, params) do
    case Episode.save(conn, params) do
      :ok ->
        json(conn, %{status: "success"})

      _ ->
        # TODO: find accurate status code / error description
        conn
        |> put_status(418)
        |> json(%{status: "error"})
    end
  end
end
