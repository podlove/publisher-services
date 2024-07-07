import Config

port = String.to_integer(System.get_env("PORT") || "4005")

config :publisher, PublisherWeb.Endpoint,
  ip: {0, 0, 0, 0, 0, 0, 0, 0},
  port: port
