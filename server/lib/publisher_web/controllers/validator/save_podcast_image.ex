defmodule PublisherWeb.Controllers.Validator.SavePodcastImage do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:name, :string)
    field(:base64Data, :string)
    field(:type, :string)
  end

  @allowed_attrs [:name, :base64Data, :type]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@allowed_attrs)
  end
end
