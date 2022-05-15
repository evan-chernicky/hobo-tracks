class UsersController < ApplicationController
  before_action :authorize, only: [:show]
  # skip_before_action :verify_authenticity_token

  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def me_trips
    user = User.find(params[:user_id])
    render json: user.trips
  end


  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def update
    user = User.find_by(id: params[:id])
    if user
        user.update(user_params)
      render json: user
    else
      render json: { error: "Stop not found" }, status: :not_found
    end
  end

  def show_profile
    user = User.find_by(username: params[:username])
    if user.valid?
      render json: user
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end      
  end

  def create_photo
    user = User.find(params[:id])
    filename = params[:file].original_filename
    content_type = params[:file].content_type
    path = params[:file].tempfile.path
    user.avatar.attach(io: File.open(path), filename: filename, content_type: content_type)
    user.save()

    render json: user, status: :created
  end

  def update_photo

    user = User.find(params[:id])
    user.avatar.purge
    filename = params[:file].original_filename
    content_type = params[:file].content_type
    path = params[:file].tempfile.path
    user.avatar.attach(io: File.open(path), filename: filename, content_type: content_type)
    user.save()
  
    render json: user, status: :accepted
  end

  def delete_photo
    user = User.find(params[:id])
    user.avatar.purge
    user.save()
    render json: user, status: :accepted
  end

  private

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def user_params
    params.permit(:username, :password, :password_confirmation, :bio, :first_name, :last_name)
  end
  
end
