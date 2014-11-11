class Schedule < ActiveRecord::Base
  serialize :channels, Array
  serialize :conditions, Array

  belongs_to :group
  
  before_save :repeatable

  def repeatable
    self.is_repeated ? (self.start_date = nil) : (self.conditions = []) 
  end

end
