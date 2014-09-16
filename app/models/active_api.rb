class ActiveApi

  cattr_accessor :endpoint, :email, :auth_token
  include ActiveApiBase

  def self.init_auth account
    @@endpoint   = ENV["END_POINT"]
    @@email      = account.email
    @@auth_token = account.auth_token
  end
end