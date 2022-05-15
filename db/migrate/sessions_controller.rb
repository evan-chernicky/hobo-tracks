class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    session[:session_hello] ||= "World"
    render json: { session: session}
  end
  
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] ||= user.id
      session[:httponly] = false
      render json: user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
  
  end