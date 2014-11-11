# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :schedule do
    group_id 1
    channels []
    call_flow_id 1
    start_date "2014-09-19"
    conditions []
    is_repeated false

    from "10:10"
    to "12:00"
    retries_in_hours "1,23,1,20.60"
  end
end
