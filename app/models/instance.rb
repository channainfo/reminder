class Instance < ActiveRecord::Base
  validates :name, :url, :end_point, presence: true
  validates_uniqueness_of :name, :url, :end_point
  validates_format_of :url, :end_point, with: URI.regexp

  MINIMUM = 1 # must be at least one
end
