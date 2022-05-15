class UserSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :first_name, :home_country, :last_name, :username, :avatar_url, :bio, :trip_number

  has_many :trips
  has_many :stops
  has_many :followers
  has_many :followings
  has_many :favorites
  has_many :favorited_trips

  def avatar_url
    self.object.avatar.url if self.object.avatar.attached?
  end

  def trip_number
    self.object.trips.count()
  end


end
