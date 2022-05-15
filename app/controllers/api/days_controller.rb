class Api::DaysController < ApplicationController
    before_action :authorize
    # skip_before_action :verify_authenticity_token

    def create
        day = Day.create(day_params)
        if day.valid?
            render json: day, status: :created
        else
            render json: { error: day.errors.full_messages }, status: :unprocessable_entity
        end  
    end

    def update
        day = Day.find_by(id: params[:id])
        if day
            day.update(day_params)
          render json: day
        else
          render json: { error: "Day not found" }, status: :not_found
        end
      end

    def destroy
        day = Day.find(params[:id])
        day.destroy
        head :no_content
      end

    private

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

    def day_params
        params.permit(:trip_id, :description, :date)
    end


end
