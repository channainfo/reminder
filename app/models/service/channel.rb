class Service::Channel < ActiveApi
  attribute :id, Integer
  attribute :name, String

  @@channels = {}

  def self.collection account_id
    account_id ? cached(account_id).map{|channel| [channel.name, channel.id] } : []
  end

  def self.cached account_id
    @@channels[account_id] || self.fetch(account_id)
  end

  private
  
  def self.fetch account_id
    @@channels[account_id] = account_id ? where(account_id: account_id) : all
  end
end
