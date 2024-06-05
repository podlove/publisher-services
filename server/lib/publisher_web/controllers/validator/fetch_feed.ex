defmodule PublisherWeb.Controllers.Validator.FetchFeed do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field(:url, :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:url])
    |> validate_required([:url])
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
