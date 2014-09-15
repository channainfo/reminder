class Instance < ActiveRecord::Base
  validates :name, :url, :end_point, presence: true
  validates_uniqueness_of :name, :url, :end_point
  validates_format_of :url, :end_point, with: URI.regexp

  MINIMUM = 1 # must be at least one

  before_destroy :validate_minimum

  def validate_minimum
    raise 'Instance must be at least one' if Instance.count <= MINIMUM
  end
end
