defmodule PublisherWeb.Controllers.Validator.SaveChapters do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:start, :string)
    field(:title, :string)
  end

  @allowed_attrs [:start, :title]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@allowed_attrs)
  end
end
