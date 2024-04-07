defmodule Publisher.BackendWeb.Router do
  use Publisher.BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Publisher.BackendWeb do
    pipe_through :api

    get "/demo", DemoController, :index
  end

  scope "/api/v1", Publisher.BackendWeb do
    pipe_through :api

    get "/fetch_feed", FeedParserController, :index
  end
end
