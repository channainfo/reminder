class Group < ActiveRecord::Base
	serialize :addresses, Array

	validates :name, :account_id, presence: true
	validates :name, uniqueness: { scope: :account_id }

end
