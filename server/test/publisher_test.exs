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
    {:ok, result} = FeedParser.parse_by_url(url, force_refresh: true)

    assert result.podcast.title == "Podlovers"
    assert result.podcast.description == "Der Podlove Entwickler:innen Podcast"
    assert result.podcast.image == "http://example.com/image.png"
    assert result.podcast.owner == %{name: "Podlovers", email: "feed@podlovers.org"}
    assert result.podcast.explicit == false
    assert result.podcast.guid == "88e824bf-54bb-498f-8b6f-e0327ade3e87"

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

  test "get_episode/1" do
    Req.Test.stub(Metalove, fn conn ->
      conn
      |> Plug.Conn.put_resp_content_type("application/rss+xml")
      |> Plug.Conn.send_resp(200, File.read!("test/data/podlovers.xml"))
    end)

    url = "https://feeds.podlovers.org/mp3"
    guid = "podlove-2024-04-06t12:42:13+00:00-1cbdd937193946a"
    {:ok, _result} = FeedParser.parse_by_url(url, force_refresh: true)
    {:ok, %{episode: episode}} = FeedParser.get_episode(url, guid)

    assert episode.guid == guid
    assert episode.title == "PTF Sprint 2: Ein neuer Weg"
    assert episode.subtitle == "Im zweiten Sprint haben wir einen neuen Ansatz getestet"
    assert episode.summary =~ "Weiter geht's mit unserem Sprint-Review"
    assert episode.content == "Hello 👋"

    assert episode.number == 28
    assert episode.type == "full"
    assert episode.explicit == true

    assert episode.media_file == %{
             url: "https://backend.podlovers.org/podlove/file/39/s/feed/c/mp3/LOV28.mp3",
             content_length: 37_693_326,
             type: "audio/mpeg"
           }

    assert length(episode.chapters) == 6

    assert hd(episode.chapters) == %{
             start: "00:01:32.495",
             title: "Der externe Service nimmt Gestalt an"
           }

    assert episode.contributors == [
             %{name: "Alexander Heimbuch", uri: "https://alexander.heimbu.ch"},
             %{name: "Dirk Schumann"},
             %{name: "Eric Teubert", uri: "https://ericteubert.de/"},
             %{name: "Martin Fischer", uri: "martin"},
             %{name: "Einspieler"}
           ]

    assert %{
             url: "https://files.podlovers.org/LOV28.vtt",
             type: "text/vtt"
           } = episode.transcript
  end
end
