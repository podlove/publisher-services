defmodule PublisherWeb.Controllers.Validator.SavePodcast do
  use Ecto.Schema
  import Ecto.Changeset

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

  def validate_params(params) do
    case changeset(params) do
      %Ecto.Changeset{valid?: false} = changeset ->
        {:error, changeset}

      %Ecto.Changeset{valid?: true, changes: changes} ->
        {:ok, changes}
    end
  end

  def changeset_to_errors(changeset) do
    traverse_errors(changeset, fn {msg, _opts} -> msg end)
  end
end
