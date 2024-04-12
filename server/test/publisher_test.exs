defmodule PublisherTest do
  use ExUnit.Case

  alias Publisher.FeedParser

  test "parse_by_url/1" do
    Req.Test.stub(Metalove, fn conn ->
      conn
      |> Plug.Conn.put_resp_content_type("application/rss+xml")
      |> Plug.Conn.send_resp(200, File.read!("test/data/podlovers.xml"))
    end)

    url = "https://feeds.podlovers.org/mp3"
    {:ok, result} = FeedParser.parse_by_url(url)

    assert result.podcast.title == "Podlovers"
    assert result.podcast.description == "Der Podlove Entwickler:innen Podcast"
    assert result.podcast.image == "http://example.com/image.png"
    assert result.podcast.owner == %{name: "Podlovers", email: "feed@podlovers.org"}
    assert result.podcast.explicit == false

    assert result.podcast.categories == [
             ["Technology"],
             ["Health", "Mental Health"]
           ]

    assert result.podcast.language == "de-DE"
    assert result.podcast.copyright == "All rights reversed"

    assert [episode] = result.episodes
    assert episode.guid == "podlove-2024-04-06t12:42:13+00:00-1cbdd937193946a"
    assert episode.title == "PTF Sprint 2: Ein neuer Weg"
  end
end
