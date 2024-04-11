defmodule Publisher.Backend.PodcastSearch do
  def search(value) do
    config = Application.get_env(:publisher_backend, __MODULE__)
    key = Keyword.get(config, :key)
    secret = Keyword.get(config, :secret)
    time = DateTime.utc_now() |> DateTime.to_unix()

    hash =
      :crypto.hash(:sha, key <> secret <> to_string(time))
      |> Base.encode16()
      |> String.downcase()

    req = Req.new(base_url: "https://api.podcastindex.org/api/1.0")

    req =
      Req.Request.put_headers(req, [
        {"User-Agent", "Podlove/OnboardingWizard"},
        {"X-Auth-Key", key},
        {"X-Auth-Date", to_string(time)},
        {"Authorization", hash}
      ])

    result =
      Req.get!(
        req,
        url: "/search/byterm",
        params: %{q: value}
      )

    result.body["feeds"]
    |> Enum.map(fn feed ->
      Map.take(feed, ["title", "url", "image", "author"])
    end)
  end
end
