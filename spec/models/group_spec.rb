require 'rails_helper'

RSpec.describe Group, :type => :model do

	it { should validate_presence_of(:name) }
	it { should validate_presence_of(:account_id) }
	it { should validate_uniqueness_of(:name).scoped_to(:account_id) }

  describe "save" do
  	context "valid addresses" do
  		let(:group) { build(:group, addresses: ["1000"]) }

  		it { expect(group.save).to eq(true) }
      it { expect(group.addresses).to eq(["1000"])}
  	end

  	context "invalid addresses" do
  		let(:group) { build(:group, addresses: "1000") }

  		it { expect{group.save}.to raise_exception  }
  	end
  end
end
