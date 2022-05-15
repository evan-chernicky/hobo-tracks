class Trip < ApplicationRecord
    # has_many :days, dependent: :destroy
    # has_many :stops, through: :days, dependent: :destroy
    # has_many :favorites, dependent: :destroy
    belongs_to :user
    # has_one_attached :image
    validates :trip_name, presence: true
end
