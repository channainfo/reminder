class LoginForm
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :endpoint, :email, :password

  validates :endpoint, :email, :password, presence: true

  def initialize params={}
    @endpoint = Instance.first.end_point
    @email    = params[:email]
    @password = params[:password]
  end
end