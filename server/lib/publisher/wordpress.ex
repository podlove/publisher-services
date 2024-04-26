defmodule Publisher.Wordpress do

  def parse_validate(body) do
    case Map.get(body, "wordpress") do
      nil ->
        { :error, "Wordpress data are missing!"}
      %{"user"=> _, "password" => _, "site" => _} ->
        {:ok, body}
      _ ->
        {:error, "Missing data"}
    end |> case do
      { :error, reason} ->
        { :error, reason}
      { :ok, body } ->
        case Map.get(body, "podcast") do
          nil ->
            { :error, "Podcast data are missing!"}
          %{"name" => _} ->
            {:ok, body}
          _ ->
            { :error, "Missing data"}
        end
    end
  end

end
