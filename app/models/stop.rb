class Stop < ApplicationRecord
    # belongs_to :day
    # has_one :trip, :through => :day
    # has_one :user, :through => :trip
    # has_many_attached :images, dependent: :destroy
    validates :name, presence: true
    validates :location, presence: true
    validates :latitude, presence: true
    validates :longitude, presence: true
    validates :time, presence: true
    validates :day_id, presence: true

end
