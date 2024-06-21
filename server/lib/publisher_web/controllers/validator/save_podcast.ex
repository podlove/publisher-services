defmodule PublisherWeb.Controllers.Validator.SavePodcast do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:name, :string)
    field(:description, :string)
    field(:author, :string)
    field(:language, :string)
    field(:category, :string)
    field(:explicit, :string)
  end

  @allowed_attrs [:name, :description, :author, :language, :category, :explicit]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@allowed_attrs)
  end
end
