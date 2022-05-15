class RemoveTripDates < ActiveRecord::Migration[7.0]
  def change
    remove_column :trips, :start_date
    remove_column :trips, :end_date
  end
end
