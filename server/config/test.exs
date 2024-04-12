import Config

config :logger, level: :warning

config :metalove, :req_options, plug: {Req.Test, Metalove}
