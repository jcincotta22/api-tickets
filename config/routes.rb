Rails.application.routes.draw do
  root 'tickets#index'

  resource :tickets
end
