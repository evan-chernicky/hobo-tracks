class Api::TripsController < ApplicationController
    before_action :authorize
    # skip_before_action :verify_authenticity_token

    def index
      render json: Trip.all
    end
    

    def show
      trip = Trip.find(params[:id])
      render json: trip
    end

    def followed_trips
      #only finds trips of users you follow
      user = User.find(params[:id])
      trips = []
      if !user.followings.empty?
        user.followings.map do |following|
          follower_trips = following.trips
          if (!follower_trips.empty?)
            follower_trips.each do |follower_trip|
              trips << follower_trip
            end
          end
        end
        render json: trips
      else
        render json: { error: trips.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def create
        trip = Trip.create(trip_params)
        if trip.valid?
            render json: trip, status: :created
        else
            render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
        end  
    end

    def create_photo

      trip = Trip.find(params[:id])
      filename = params[:file].original_filename
      content_type = params[:file].content_type
      path = params[:file].tempfile.path
      trip.image.attach(io: File.open(path), filename: filename, content_type: content_type)
      trip.save()
    
      render json: trip, status: :created
    end

    def update_photo

      trip = Trip.find(params[:id])
      trip.image.purge
      filename = params[:file].original_filename
      content_type = params[:file].content_type
      path = params[:file].tempfile.path
      trip.image.attach(io: File.open(path), filename: filename, content_type: content_type)
      trip.save()
    
      render json: trip, status: :accepted
    end

    def delete_photo
      trip = Trip.find(params[:id])
      trip.image.purge
      trip.save()
      head :no_content
    end

    def update
      trip = Trip.find_by(id: params[:id])
      if trip
          trip.update(trip_params)
        render json: trip
      else
        render json: { error: "Stop not found" }, status: :not_found
      end
    end

    def destroy
      trip = Trip.find(params[:id])
      trip.destroy
      head :no_content
    end

    private

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
  
    def trip_params
      params.permit(:trip_name, :description, :start_date, :end_date, :user_id, :id)
    end

end
