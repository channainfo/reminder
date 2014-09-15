class CreateInstances < ActiveRecord::Migration
  def change
    create_table :instances do |t|
      t.string :name
      t.string :url
      t.string :end_point

      t.timestamps
    end
  end
end
