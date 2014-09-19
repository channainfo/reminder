class Group < ActiveRecord::Base
	serialize :addresses, Array
  has_many :schedules, dependent: :nullify

	validates :name, :account_id, presence: true
	validates :name, uniqueness: { scope: :account_id }

end
