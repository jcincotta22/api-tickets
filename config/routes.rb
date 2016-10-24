Rails.application.routes.draw do
  root 'tickets#index'
  devise_for :users

  namespace :api do
    resources :saved_events, only: [:index, :create, :destroy]
    match "/events" => 'tickets#events', via: [:post, :get]
  end
end
