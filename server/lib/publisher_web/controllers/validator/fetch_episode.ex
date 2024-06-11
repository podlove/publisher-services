defmodule PublisherWeb.Controllers.Validator.FetchEpisode do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:feed_url, :string)
    field(:episode_guid, :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:feed_url, :episode_guid])
    |> validate_required([:feed_url, :episode_guid])
  end
end
