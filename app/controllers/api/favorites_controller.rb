class Api::FavoritesController < ApplicationController
    before_action :authorize
    # skip_before_action :verify_authenticity_token

    def show
        user = User.find(params[:id])
        trips = user.favorited_trips
        render json: trips
    end

    def create
        favorite = Favorite.create(favorite_params)
        render json: favorite, staus: :created
    end

    def destroy
        favorite = Favorite.find(params[:id])
        favorite.destroy
        head :no_content
      end
  

    private

    def favorite_params
        params.permit(:trip_id, :user_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
      end

end
