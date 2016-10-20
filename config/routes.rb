Rails.application.routes.draw do
  root 'tickets#index'
  devise_for :users

  namespace :api do
    resources :tickets, only: [:create]
    match "/events" => 'tickets#events', via: [:post, :get]
  end
end
