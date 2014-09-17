# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :group do
    name "foo"
    addresses ["1000"]
    account_id 1
  end
end
