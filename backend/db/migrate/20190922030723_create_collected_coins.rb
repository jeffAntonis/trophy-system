class CreateCollectedCoins < ActiveRecord::Migration[5.2]
  def change
    create_table :collected_coins do |t|
      t.references :user, foreign_key: true
      t.decimal :value

      t.timestamps
    end
  end
end
