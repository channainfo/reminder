class Service::Account < ActiveApi
  attribute :id, Integer
  attribute :email, String
  attribute :auth_token, String
  attribute :role, String
end