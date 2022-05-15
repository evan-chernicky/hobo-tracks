class CreateStops < ActiveRecord::Migration[7.0]
  def change
    create_table :stops do |t|
      t.integer :trip_id
      t.integer :order
      t.decimal :latitude, { precision: 10, scale: 6 } 
      t.decimal :longitude, { precision: 10, scale: 6 }
      t.string :description

      t.timestamps
    end
  end
end
