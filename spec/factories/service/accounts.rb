# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :account, class: Api::Account do
    id "1"
    email "example@reminder.org"
    auth_token "alkjakldjakldjaldjal"
    account_id 1
  end
end
