require 'rails_helper'

RSpec.describe Schedule, :type => :model do
  describe 'create schedule' do
    let(:conditions) do
      [{
        "var_name"=>{
          "id"=>4,
          "name"=>"var-2",
          "projectName"=>"test"
        },
        "operator"=>"=",
        "value"=>"12",
        "data_type"=>"Month"
      }]
    end
    
    context "with repeat option" do
      
      it "save schedule with condition value and set start_date to nil" do
        schedule = build(:schedule)

        schedule.is_repeated  = true
        schedule.start_date   = '2014-09-09'
        schedule.conditions   = conditions

        expect{schedule.save}.to change{Schedule.count}.by(1)
        expect(schedule.conditions).to eq conditions
        expect(schedule.start_date).to eq nil
      end
    end

    context "without repeat option" do
      it "save schedule with start_date value and set conditions array" do
        schedule = build(:schedule)

        schedule.is_repeated    = false
        schedule.start_date = '2014-09-09'
        schedule.conditions   = conditions

        expect{schedule.save}.to change{Schedule.count}.by(1)

        expect(schedule.conditions).to eq([])

        expect(schedule.start_date).to eq(Date.new(2014, 9, 9))
      end
    end

  end
end