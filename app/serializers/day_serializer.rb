class DaySerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :description, :date
  has_many :stops
end
