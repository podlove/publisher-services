defmodule PublisherWeb.Controllers.Validator.Validator do
  defmodule Behaviour do
    @callback changeset_to_errors(any()) :: any()
    @callback validate_params(any()) :: {:ok, any()} | {:error, any()}
  end

  defmacro __using__(_opts) do
    quote do
      use Ecto.Schema
      import Ecto.Changeset

      @behaviour Behaviour

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

      defoverridable Behaviour
    end
  end
end
