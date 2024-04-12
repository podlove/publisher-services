import Config

config :publisher, PublisherWeb.Endpoint,
  ip: {0, 0, 0, 0, 0, 0, 0, 0},
  port: "4000"

config :logger, :console, format: "$time $metadata[$level] $message\n"

config :metalove, :req_options, []

import_config "#{config_env()}.exs"
