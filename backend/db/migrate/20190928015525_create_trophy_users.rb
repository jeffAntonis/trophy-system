class CreateTrophyUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :trophy_users do |t|
      t.references :user, foreign_key: true
      t.references :trophy, foreign_key: true
      t.references :monster, foreign_key: true

      t.timestamps
    end
  end
end
