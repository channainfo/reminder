class Session
  cattr_accessor :success, :credential, :end_point

  # must be matched with role setting in Verboice
  VERBOICE_ADMIN_ROLE = 1
  VERBOICE_USER_ROLE = 2


  def self.login end_point, email, password
    url = end_point + "/auth"
    response = Typhoeus::Request.post(url , body: {account: {email: email, password: password} }, headers: {"Accept" => "application/json"} )

    if response.success?
      @@success = true
      Api::Account.new(JSON.parse(response.body, symbolize_names: true))
    else
      @@success = false
      if response.code == 401 
        JSON.parse(response.body, symbolize_names: true)
      elsif response.code == 404
        {success: false, message: 'Page not found'} 
      end
    end
  end

  def self.success?
    @@success
  end

end