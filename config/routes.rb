Rails.application.routes.draw do
  root 'tickets#index'
  devise_for :users

  namespace :api do
    resources :tickets, only: [:create]
    resources :saved_events, only: [:index]
    match "/events" => 'tickets#events', via: [:post, :get]
  end
end
