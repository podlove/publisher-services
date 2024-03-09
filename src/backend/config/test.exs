import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :publisher_backend, Publisher.BackendWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "aU4jciM34F/130L2ZPTEqpWeESzNYK9NAr2UDSyki4ngw695mx4L79FdPunxG2kJ",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
