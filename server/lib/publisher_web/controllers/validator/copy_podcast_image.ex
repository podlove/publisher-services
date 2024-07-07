defmodule PublisherWeb.Controllers.Validator.CopyPodcastImage do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:name, :string)
    field(:url, :string)
  end

  @allowed_attrs [:name, :url]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@allowed_attrs)
  end
end
