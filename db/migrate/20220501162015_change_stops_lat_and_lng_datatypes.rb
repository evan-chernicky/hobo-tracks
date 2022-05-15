class ChangeStopsLatAndLngDatatypes < ActiveRecord::Migration[7.0]
  def change
    change_column :stops, :latitude, :string
    change_column :stops, :longitude, :string
  end
end
