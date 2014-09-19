class Service::Project < ActiveApi
  attribute :id, Integer
  attribute :name, String
  attribute :call_flows, Array
  attribute :project_variables, Array

  @@projects = {}

  def self.collection account_id
    account_id ? cached(account_id).map{|project| [project.name, project.id] } : []
  end

  def self.cached account_id
    @@projects[account_id] || self.fetch(account_id)
  end

  private

  def self.fetch account_id
    @@projects[account_id] = account_id ? where(account_id: account_id) : all
  end
end
