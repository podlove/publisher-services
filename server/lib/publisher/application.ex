defmodule Publisher.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    config = Application.get_env(:publisher, PublisherWeb.Endpoint)

    children = [
      {
        Bandit,
        plug: PublisherWeb.Endpoint, port: config[:port]
      }
    ]

    opts = [strategy: :one_for_one, name: Publisher.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
