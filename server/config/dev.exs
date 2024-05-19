import Config

config :publisher, PublisherWeb.Endpoint,
  ip: {0, 0, 0, 0, 0, 0, 0, 0},
  port: "4005"

config :logger, :console, format: "[$level] $message\n"
