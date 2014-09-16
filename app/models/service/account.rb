class Service::Account < ActiveApi
  attribute :id, Integer
  attribute :email, String
  attribute :auth_token, String
end