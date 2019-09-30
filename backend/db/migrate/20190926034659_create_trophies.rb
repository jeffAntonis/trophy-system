class CreateTrophies < ActiveRecord::Migration[5.2]
  def change
    create_table :trophies do |t|
      t.string :name
      t.text :description
      t.string :type_trophy
      t.integer :level

      t.timestamps
    end
  end
end
