class ChangeStopOrderToTime < ActiveRecord::Migration[7.0]
  def change
    rename_column :stops, :order, :time
    change_column :stops, :time, :string
  end
end
