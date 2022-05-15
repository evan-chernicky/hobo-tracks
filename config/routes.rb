Rails.application.routes.draw do
  resources :favorites, only: [:show, :create, :destroy]
  resources :trips
  resources :days, only: [:create, :update, :destroy]
  resources :stops, only: [:create, :destroy, :index, :update]
  resources :users, only: [:index, :create, :destroy, :update]
  resources :follows, only: [:create, :destroy]

  #create stop photos
  post "/create-stop-photos/:id", to: "stops#create_photos"
  delete "/delete-stop-photo/:id", to: "stops#destroy_photo"

  #get profile
  get '/profile', to: 'users#show_profile'

  #log in and out
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  #get sessiopn
  get "/sessions", to: "sessions#index"

  #signup
  post "/signup", to: "users#create"

  #get logged in user and logged in user's trips 
  get "/me", to: "users#show"
  get "/me/trips/:user_id", to: "users#me_trips"

  #create/update trip photo
  post "/create-trip-photo/:id", to: "trips#create_photo"
  patch "/create-trip-photo/:id", to: "trips#update_photo"
  delete "/delete-trip-photo/:id", to: "trips#delete_photo"

  #get trips from people you follow
  get "/followed-trips/:id", to: "trips#followed_trips"

  #create user photo
  post "/create-user-photo/:id", to: "users#create_photo"
  patch "/create-user-photo/:id", to: "users#update_photo"
  delete "/delete-user-photo/:id", to: "users#delete_photo"

end

