defmodule PublisherWeb.Controllers.API do
  require Logger

  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.WordPress.Episode
  alias Publisher.WordPress.Podcast
  alias PublisherWeb.Controllers.Validator

  def fetch_feed(conn, params) do
    with_validation(conn, params, Validator.FetchFeed, fn conn, data ->
      {:ok, result} = FeedParser.parse_by_url(data.feed_url, force_refresh: data.force_refresh)

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
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      case Podcast.feed_url(headers) do
        {:ok, data} ->
          json(conn, data)

        {:error, reason} ->
          Logger.error("podcast_feed_url doesnot work reason: #{inspect(reason)}")
          bad_request_resp(conn, "Error: Podcast.feed_url")
      end
    end)
  end

  def set_podcast_settings(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      case Podcast.set_settings(headers, body) do
        :ok ->
          json(conn, %{})

        {:error, reason} ->
          Logger.error("podcast_set_settings reason: #{inspect(reason)}")
          bad_request_resp(conn, "Error: Podcast.set_settings")
      end
    end)
  end

  def save_podcast(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.SavePodcast, fn conn, body_data ->
        case Podcast.save_podcast_data(headers, body_data) do
          {:ok, data} ->
            json(conn, data)

          {:error, reason} ->
            Logger.error("podcast_save_data reason: #{inspect(reason)}")
            bad_request_resp(conn, "Error: Podcast.save_podcast_data")
        end
      end)
    end)
  end

  def save_podcast_image(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.SavePodcastImage, fn conn, body_data ->
        case Podcast.save_podcast_image(headers, body_data) do
          {:ok, info} ->
            json(conn, info)

          {:error, reason} ->
            Logger.error("podcast_save_image reason: #{inspect(reason)}")
            bad_request_resp(conn, "Error: Podcast.save_podcast_image")
        end
      end)
    end)
  end

  def copy_podcast_image(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.CopyPodcastImage, fn conn, body_data ->
        case Podcast.copy_podcast_image(headers, body_data) do
          {:ok, info} ->
            json(conn, info)

          {:error, reason} ->
            Logger.error("podcast_copy_image reason: #{inspect(reason)}")
            bad_request_resp(conn, "Error: Podcast.copy_podcast_image")
        end
      end)
    end)
  end

  def import_episode(conn, headers, body) do
    with_validation(conn, headers_to_map(headers), Validator.WordPressAuthHeaders, fn conn, _ ->
      with_validation(conn, body, Validator.SaveEpisode, fn conn, _ ->
        with_validation(conn, body["media_file"], Validator.SaveEnclosure, fn conn, _ ->
          with_validation_array(conn, body["chapters"], Validator.SaveChapters, fn conn, _ ->
            case Episode.save(conn, body) do
              :ok -> json(conn, %{status: "success"})
              _ -> bad_request_resp(conn, "Error: unable to save episode")
            end
          end)
        end)
      end)
    end)
  end

  defp with_validation(conn, params, validator_mod, success_fn) do
    case validator_mod.validate_params(params) do
      {:ok, data} ->
        success_fn.(conn, data)

      {:error, changeset} ->
        errors = validator_mod.changeset_to_errors(changeset)
        Logger.warning("Validation Error: #{inspect(errors)}")

        conn
        |> put_status(:bad_request)
        |> json(%{errors: errors})
    end
  end

  defp with_validation_array(conn, params, validator_mod, success_fn) do
    case validator_mod.validate_array(params) do
      {:ok, data} ->
        success_fn.(conn, data)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "missing field"})
    end
  end

  # Returns a JSON response with 400 Bad Request status and the given error message
  defp bad_request_resp(conn, error_message) do
    conn
    |> put_status(:bad_request)
    |> json(%{error: error_message})
  end

  # Enum.reserse ensures that the first entry wins, in case of duplicates.
  defp headers_to_map(headers) do
    headers
    |> Enum.reverse()
    |> Enum.into(%{})
  end
end
