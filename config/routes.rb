Rails.application.routes.draw do
  root 'tickets#index'

  namespace :api do
    match "/events" => 'tickets#events', via: [:post, :get]
  end
end
