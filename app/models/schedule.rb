class Schedule < ActiveRecord::Base
  serialize :channels, Array
  serialize :conditions, Hash

  belongs_to :group
  
  before_save :normalize_channels

  def normalize_channels
    self.channels = self.channels.map{|c| Service::Channel.new(id: c[:id], name: c[:name])}
  end

end
