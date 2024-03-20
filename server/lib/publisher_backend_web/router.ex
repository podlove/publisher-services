defmodule Publisher.BackendWeb.Router do
  use Publisher.BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Publisher.BackendWeb do
    pipe_through :api

    get "demo", DemoController, :index
  end
end
