class AddIsRepeatedToSchedules < ActiveRecord::Migration
  def change
    add_column :schedules, :is_repeated, :boolean, default: false
  end
end
