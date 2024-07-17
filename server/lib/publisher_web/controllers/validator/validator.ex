defmodule PublisherWeb.Controllers.Validator.Validator do
  defmodule Behaviour do
    @callback changeset_to_errors(any()) :: any()
    @callback validate_params(any()) :: {:ok, any()} | {:error, any()}
    @callback validate_array(any()) :: {:ok, any()} | {:error, any()}
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

          %Ecto.Changeset{valid?: true} = changeset ->
            {:ok, Ecto.Changeset.apply_changes(changeset)}
        end
      end

      def validate_array(params_list) when is_list(params_list) do
        results = Enum.map(params_list, &validate_params/1)

        {errors, valids} = Enum.split_with(results, fn
          {:error, _} -> true
          {:ok, _} -> false
        end)

        case errors do
          [] -> {:ok, Enum.map(valids, fn {:ok, result} -> result end)}
          _ -> {:error, Enum.map(errors, fn {:error, changeset} -> changeset end)}
        end
      end

      def changeset_to_errors(changeset) do
        traverse_errors(changeset, fn {msg, _opts} -> msg end)
      end

      defoverridable Behaviour
    end
  end
end
