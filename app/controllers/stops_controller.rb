class StopsController < ApplicationController
    before_action :authorize
    # skip_before_action :verify_authenticity_token

    def index
      render json: Stop.all, include: ['user', 'trip']
    end

    def create
        stop = Stop.create(stop_params)
        if stop.valid?
            render json: stop, status: :created
        else
            render json: { error: stop.errors.full_messages }, status: :unprocessable_entity
        end  
    end

    def update
      stop = Stop.find_by(id: params[:id])
      if stop
          stop.update(stop_params)
        render json: stop
      else
        render json: { error: "Stop not found" }, status: :not_found
      end
    end

    def create_photos
      stop = Stop.find(params[:id])
      files = params[:files]
      files.each do |file|
        filename = file.original_filename
        content_type = file.content_type
        path = file.tempfile.path
        stop.images.attach(io: File.open(path), filename: filename, content_type: content_type)
        stop.save()
      end

      render json: stop, status: :created

    end

    def destroy_photo
      photo_id = params[:photo_id].to_i
      stop = Stop.find(params[:id])
       stop.images.each do |image|
            if (image.id == photo_id)
              image.purge
              stop.save()
            end
          end
          render json: stop
    end

    def destroy
      stop = Stop.find(params[:id])
      stop.destroy
      head :no_content
    end

    private

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
  
    def stop_params
      params.permit(:name, :location, :latitude, :longitude, :time, :day_id, :description, :stop)
    end


end
