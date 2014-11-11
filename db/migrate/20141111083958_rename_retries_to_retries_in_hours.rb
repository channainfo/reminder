class RenameRetriesToRetriesInHours < ActiveRecord::Migration
  def change
    rename_column :schedules, :retries, :retries_in_hours
  end
end
