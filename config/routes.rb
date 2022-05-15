Rails.application.routes.draw do
  resources :users, only: [:index, :create, :destroy, :update]
  resources :stops, only: [:create, :destroy, :index, :update]
end

