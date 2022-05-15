class CreateTripsUserId < ActiveRecord::Migration[7.0]
  def change
    add_column :trips, :user_id, :integer   
  end
end
