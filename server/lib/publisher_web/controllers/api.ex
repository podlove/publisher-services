defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.WordPress.Episode
  alias Publisher.WordPress.Podcast
  alias PublisherWeb.Controllers.Validator

  def fetch_feed(conn, params) do
    with_validation(conn, params, Validator.FetchFeed, fn conn, data ->
      {:ok, result} = FeedParser.parse_by_url(data.feed_url)
      json(conn, result)
    end)
  end

  def fetch_episode(conn, params) do
    with_validation(conn, params, Validator.FetchEpisode, fn conn, data ->
      {:ok, episode} = FeedParser.get_episode(data.feed_url, data.episode_guid)
      json(conn, episode)
    end)
  end

  def podcast_feed_url(conn, headers) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressSiteHeader, fn conn, data ->
      case Podcast.feed_url(data[:"wordpress-site"]) do
        {:ok, data} -> json(conn, data)
        {:error, reason} -> send_resp(conn, 400, "Error: #{reason}")
      end
    end)
  end

  def save_podcast(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.SavePodcast, fn conn, body_data ->
        case Podcast.save_podcast_data(headers, body_data) do
          {:ok, data} -> json(conn, data)
          {:error, reason} -> send_resp(conn, 400, "Error: #{reason}")
        end
      end)
    end)
  end

  def save_podcast_image(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.SavePodcastImage, fn conn, body_data ->
        case Podcast.save_podcast_image(headers, body_data) do
          {:ok, info} -> json(conn, info)
          {:error, reason} -> send_resp(conn, 400, "Error: #{reason}")
        end
      end)
    end)
  end

  def import_episode(conn, params) do
    headers = conn.req_headers

    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      case Episode.save(conn, params) do
        :ok -> json(conn, %{status: "success"})
        _ -> send_resp(conn, 400, "Error: unable to save episode")
      end
    end)
  end

  defp with_validation(conn, params, validator_mod, success_fn) do
    case validator_mod.validate_params(params) do
      {:ok, data} ->
        success_fn.(conn, data)

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: validator_mod.changeset_to_errors(changeset)})
    end
  end

  # Enum.reserse ensures that the first entry wins, in case of duplicates.
  defp headers_to_map(headers) do
    headers
    |> Enum.reverse()
    |> Enum.into(%{})
  end
end
