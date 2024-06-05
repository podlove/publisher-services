defmodule PublisherWeb.Controllers.Validator.FetchEpisode do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field(:feed_url, :string)
    field(:episode_guid, :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:feed_url, :episode_guid])
    |> validate_required([:feed_url, :episode_guid])
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
