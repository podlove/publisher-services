defmodule PublisherWeb.Controllers.Validator.SaveEpisode do
  use PublisherWeb.Controllers.Validator.Validator

  import Publisher.WordPress.Episode, only: [parse_date: 1]

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

  defp validate_date(changeset, :pub_date) do
    validate_change(changeset, :pub_date, fn _, pub_date ->
      if publication_date_valid?(pub_date) do
        []
      else
        [pub_date: "is not a valid date"]
      end
    end)
  end

  defp publication_date_valid?(value) do
    parse_date(value) !== nil
  end
end
