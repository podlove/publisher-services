defmodule PublisherWeb.Controllers.Validator.WordPressSiteHeader do
  use PublisherWeb.Controllers.Validator.Validator

  embedded_schema do
    field(:"wordpress-site", :string)
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:"wordpress-site"])
    |> validate_required([:"wordpress-site"])
  end

  def changeset_to_errors(changeset) do
    traverse_errors(changeset, fn {msg, _opts} -> "header field #{msg}" end)
  end
end
