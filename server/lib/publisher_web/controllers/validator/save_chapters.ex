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
    |> validate_normalplaytime(:start)
  end

  defp validate_normalplaytime(changeset, field) do
    validate_change(changeset, field, fn _, value ->
      if normalplaytime_valid?(value) do
        []
      else
        [{field, " is not conform with NormalPlayTime"}]
      end
    end)
  end

  defp normalplaytime_valid?(field) do
    cond do
      Regex.match?(~r/^\d+(?:\.\d+)?$/, field) -> true
      Regex.match?(~r/^\d+:\d\d?(?:\.\d+)?$/, field) -> true
      Regex.match?(~r/^\d+:\d\d?:\d\d?(?:\.\d+)?$/, field) -> true
      true -> false
    end
  end
end
