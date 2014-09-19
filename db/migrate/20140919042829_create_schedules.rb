class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.integer :group_id
      t.text :channels
      t.integer :call_flow_id
      t.date :start_date
      t.text :conditions
      t.string :from
      t.string :to
      t.string :retries

      t.timestamps
    end
  end
end
