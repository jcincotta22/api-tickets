Rails.application.routes.draw do
  root 'tickets#index'
  devise_for :users

  namespace :api do
    resources :search_histories, only: [:index]
    resources :saved_events, only: [:index, :create, :destroy]
    match "/events" => 'tickets#events', via: [:post, :get]
    match "/delete_all" => 'search_histories#delete_all', via: [:delete]
  end
end
