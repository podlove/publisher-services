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
    field(:pub_date, :string)
  end

  @allowed_attrs [:guid, :title, :subtitle, :summary, :slug, :content, :cover, :pub_date]
  @required_attrs [:guid, :title, :slug]

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @allowed_attrs)
    |> validate_required(@required_attrs)
    |> validate_date(:pub_date)
  end

  defp validate_date(changeset, field) do
    validate_change(changeset, field, fn _, value ->
      if publication_date_valid?(value) do
        []
      else
        [{field, " is not a conformed date"}]
      end
    end)
  end

  defp publication_date_valid?(field) do
    formats = [
      "{RFC822}",
      "{RFC822z}",
      "{RFC1123}",
      "{RFC1123z}",
      "{RFC3339}",
      "{RFC3339z}",
      "{ISO:Extended}",
      "{ISO:Extended:Z}"
    ]

    Enum.find_value(formats, fn format ->
      case Timex.parse(field, format) do
        {:ok, field} -> field
        {:error, _} -> false
      end
    end)
  end
end
