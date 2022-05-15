class User < ApplicationRecord
    has_secure_password
    # has_many :trips, dependent: :destroy
    # has_many :stops, through: :trips, dependent: :destroy
    # has_many :favorites
    # has_many :favorited_trips, through: :favorites, source: :trip
    # has_one_attached :avatar, dependent: :destroy
    validates :username, presence: true, uniqueness: true, length: { minimum: 4, maximum: 16 }
    validates :bio, length: { maximum: 160 }

    

      # # Will return an array of follows for the given user instance
      #   has_many :received_follows, foreign_key: :followed_user_id, class_name: "Follow"

      #   # Will return an array of users who follow the user instance
      #   has_many :followers, through: :received_follows, source: :follower
                
      #   # returns an array of follows a user gave to someone else
      #   has_many :given_follows, foreign_key: :follower_id, class_name: "Follow"
        
      #   # returns an array of other users who the user has followed
      #   has_many :followings, through: :given_follows, source: :followed_user
end
