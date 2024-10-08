defmodule PublisherWeb.Controllers.Validator.SaveEpisode do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:guid, :string)
    field(:title, :string)
    field(:subtitle, :string)
    field(:summary, :string)
    field(:slug, :string)
    field(:content, :string)
    field(:cover, :string)
  end

  @allowed_attrs [:guid, :title, :subtitle, :summary, :slug, :content, :cover]
  @required_attrs [:guid, :title, :slug]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@required_attrs)
  end
end
