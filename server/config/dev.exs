import Config

config :logger, :console, format: "[$level] $message\n"

config :honeybadger, environment_name: :dev
