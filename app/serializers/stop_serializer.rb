class StopSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :latitude, :longitude, :time, :day_id, :description, :images
  has_one :trip
  has_one :user

  def images
    if self.object.images.attached?
      self.object.images.map do |image|
        image = {
          id: image.id,
          name: image.filename,
          url: image.url
         }
      end
    end
  end

end
