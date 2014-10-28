class AddProjectToSchedulesTable < ActiveRecord::Migration
  def change
    add_column :schedules, :project_id, :integer
  end
end
