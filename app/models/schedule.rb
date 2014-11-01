class Schedule < ActiveRecord::Base
  serialize :channels, Array
  serialize :conditions, Array

  belongs_to :group
  
  before_save :normalize_channels
  before_save :repeatable

  def repeatable
    self.is_repeated ? (self.start_date = nil) : (self.conditions = []) 
  end

  def normalize_channels
    self.channels = self.channels.map{|c| Api::Channel.new(id: c[:id], name: c[:name])}
  end

end
