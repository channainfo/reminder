require 'rails_helper'

RSpec.describe Schedule, :type => :model do
  describe 'create' do
    before(:each) do
      @attributes = { "group_id"=>51,
                     "channels"=>[{"id"=>5, "name"=>"5- test-xxx"}], 
                     "call_flow_id"=>6, 
                     "start_date"=>"2014-09-09T09:36:44.518Z",
                     "from"=>"11",
                     "to"=>"22",
                     "conditions"=>{ "var_name"=>{"id"=>4,
                                                  "name"=>"var-2",
                                                  "projectName"=>"test`"},
                                     "operator"=>"=",
                                     "value"=>"12",
                                     "data_type"=>"Month" }, 
                     "retries"=>"12,34" }
    end

    it "create schedule with conditions as array" do
      schedule = build(:schedule)
      schedule.conditions = @attributes['conditions']
      schedule.channels = @attributes['channels']
      expect{schedule.save}.to change{Schedule.count}.by(1)
      expect(schedule.conditions).to eq @attributes['conditions']
      expect(schedule.channels.count).to eq 1
    end

  end
end
