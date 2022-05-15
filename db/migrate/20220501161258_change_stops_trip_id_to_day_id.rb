class ChangeStopsTripIdToDayId < ActiveRecord::Migration[7.0]
  def change
    rename_column :stops, :trip_id, :day_id
  end
end
