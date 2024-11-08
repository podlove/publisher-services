import Config

config :logger, level: :warning

config :honeybadger, environment_name: :test

config :metalove, :req_options, plug: {Req.Test, Metalove}
