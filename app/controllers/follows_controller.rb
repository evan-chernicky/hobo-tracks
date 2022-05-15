class FollowsController < ApplicationController
    before_action :authorize
    # skip_before_action :verify_authenticity_token

    def create
        followed_user = params[:followed_user]
        current_user = session[:user_id]
        follow = Follow.create(follower_id: current_user, followed_user_id: followed_user)

        render json: follow, status: :created
    end

    def destroy
        unfollowed_user = User.find_by(id: params[:id])
        current_user = session[:user_id]
        follow = unfollowed_user.received_follows.find_by(follower_id: current_user)
        follow.destroy
        head :no_content

    end

    private

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
  

end
