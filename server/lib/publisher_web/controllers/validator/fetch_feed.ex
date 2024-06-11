defmodule PublisherWeb.Controllers.Validator.FetchFeed do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:feed_url, :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:feed_url])
    |> validate_required([:feed_url])
  end
end
