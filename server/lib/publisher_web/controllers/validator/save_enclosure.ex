defmodule PublisherWeb.Controllers.Validator.SaveEnclosure do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:url, :string)
    field(:content_length, :integer)
    field(:type, :string)
  end

  @allowed_attrs [:url, :content_length, :type]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@allowed_attrs)
  end
end
