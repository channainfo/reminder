class Api::ReminderGroup < ActiveApi
  attribute :id, Integer
  attribute :project_id, Integer
  attribute :name, String
  attribute :addresses, Array

  def self.collection project_id
    project_id ? self.fetch(project_id) : []
  end

  private
  
  def self.fetch project_id
    project_id ? where(project_id: project_id) : []
  end
end
