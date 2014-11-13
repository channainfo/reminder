class Api::ReminderSchedule < ActiveApi
  attribute :id, Integer
  attribute :project_id, Integer
  attribute :call_flow_id, Integer
  attribute :reminder_group_id, Integer
  attribute :reminder_channels, Array

  attribute :client_start_date, Date
  attribute :time_from, String
  attribute :time_to, String
  attribute :schedule_type, Integer
  attribute :conditions, Array
  attribute :reties, Integer
  attribute :retries_in_hours, String

  def self.collection project_id
    project_id ? self.fetch(project_id) : []
  end

  private
  
  def self.fetch project_id
    project_id ? where(project_id: project_id) : []
  end
end
