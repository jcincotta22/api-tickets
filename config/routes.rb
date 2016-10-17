Rails.application.routes.draw do
  root 'tickets#index'
  devise_for :users

  namespace :api do
    match "/events" => 'tickets#events', via: [:post, :get]
  end
end
