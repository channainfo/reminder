class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.text :addresses
      t.integer :account_id

      t.timestamps
    end
  end
end