defmodule PublisherWeb.Controllers.Validator.WordPressAuthHeaders do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field(:"wordpress-user", :string)
    field(:"wordpress-password", :string)
    field(:"wordpress-site", :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:"wordpress-user", :"wordpress-password", :"wordpress-site"])
    |> validate_required([:"wordpress-user", :"wordpress-password", :"wordpress-site"])
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
    traverse_errors(changeset, fn {msg, _opts} -> "header field #{msg}" end)
  end
end
