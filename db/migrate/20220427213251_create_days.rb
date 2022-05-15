class CreateDays < ActiveRecord::Migration[7.0]
  def change
    create_table :days do |t|
      t.integer :trip_id
      t.string :description
      t.date :date

      t.timestamps
    end
  end
end
