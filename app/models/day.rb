class Day < ApplicationRecord
    belongs_to :trip
    has_many :stops, dependent: :destroy
end
