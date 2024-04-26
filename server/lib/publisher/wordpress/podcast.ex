defmodule Publisher.Wordpress.Podcast do

  def put_podcast_data(body) do
    user = body["wordpress"]["user"]
    password = body["wordpress"]["password"]
    site = body["wordpress"]["site"]
    name = body["podcast"]["name"]

    podlove_body = %{title: name}

    response =
      Req.post(site <> "/wp-json/podlove/v2/podcast",
        json: podlove_body,
        headers: [{"Content-Type", "application/json"}],
        auth: {:basic, user <> ":" <> password},
        connect_options: [transport_opts: [verify: :verify_none]]
      )
    case response do
      {:ok, response} ->
        {:ok, response.body}

      {:error, _} ->
        {:error, "network error"}
    end
  end
end
