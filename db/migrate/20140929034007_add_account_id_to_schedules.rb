class AddAccountIdToSchedules < ActiveRecord::Migration
  def change
    add_column :schedules, :account_id, :integer

    add_index :schedules, :account_id
  end
end
