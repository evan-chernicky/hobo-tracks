class TripSerializer < ActiveModel::Serializer
  attributes :id, :description, :trip_name, :user_id, :image_url, :day_count, :stop_count, :username, :updated_at, :favorite_count

  has_many :days
  has_many :stops
  has_one :user

  def image_url
    self.object.image.url if self.object.image.attached?
  end

  def day_count
    self.object.days.count()
  end

  def stop_count
    self.object.stops.count()
  end

  def favorite_count
    self.object.favorites.count()
  end

  def username
    self.object.user.username
  end

end

