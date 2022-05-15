class AddStopColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :stops, :name, :string
    add_column :stops, :location, :string      
  end
end
