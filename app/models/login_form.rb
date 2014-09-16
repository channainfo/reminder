class LoginForm
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :email, :password

  validates :email, :password, presence: true

  def initialize params={}
    @email    = params[:email]
    @password = params[:password]
  end
end