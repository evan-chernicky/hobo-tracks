Rails.application.routes.draw do
  resources :users, only: [:index, :create, :destroy, :update]
  resources :stops, only: [:create, :destroy, :index, :update]
  resources :days, only: [:create, :update, :destroy]
  resources :favorites, only: [:show, :create, :destroy]
  resources :trips

end

