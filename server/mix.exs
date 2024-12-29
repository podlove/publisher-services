defmodule Publisher.MixProject do
  use Mix.Project

  def project do
    [
      app: :publisher,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Publisher.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:bandit, "~> 1.0"},
      {:ecto, "~> 3.11"},
      {:jason, "~> 1.2"},
      {:req, "~> 0.4.14"},
      {:slugify, "~> 1.3"},
      {:nimble_options, "~> 1.1"},
      {:metalove, git: "https://github.com/podlove/metalove", branch: "master"},
      {:honeybadger, "~> 0.22"},
      {:timex, "~> 3.7"}
    ]
  end
end
