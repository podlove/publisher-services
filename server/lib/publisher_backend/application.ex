defmodule Publisher.Backend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Publisher.BackendWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:publisher_backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Publisher.Backend.PubSub},
      # Start a worker by calling: Publisher.Backend.Worker.start_link(arg)
      # {Publisher.Backend.Worker, arg},
      # Start to serve requests, typically the last entry
      Publisher.BackendWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Publisher.Backend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    Publisher.BackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
