defmodule PublisherWeb.Controllers.API do
  import Plug.Conn
  import PublisherWeb.Controllers.Controller, only: [json: 2]

  alias Publisher.FeedParser
  alias Publisher.WordPress
  alias Publisher.WordPress.Episode
  alias Publisher.WordPress.Podcast
  alias PublisherWeb.Controllers.Validator

  def fetch_feed(conn, params) do
    with_validation(conn, params, Validator.FetchFeed, fn conn, data ->
      {:ok, result} = FeedParser.parse_by_url(data.url)
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
end
