class ActiveApi

  cattr_accessor :endpoint, :email, :auth_token
  include ActiveApiBase

  def self.init_auth options = {}
    @@endpoint   = options[:endpoint]
    @@email      = options[:email]
    @@auth_token = options[:auth_token]
  end
end