class ApplicationController < ActionController::Base
  protect_from_forgery

  # after_action :track_previous_page
  before_action :authenticate_account!

  helper_method :current_account, :account_singed_in?

  def sign_in account
    session[:account] = Marshal.dump(account) 
  end

  def sign_out
    session[:account] = nil
  end

  def account_singed_in?
    session[:account].present?
  end

  def current_account
    @current_account ||= Marshal.load(session[:account])
  end

  def authenticate_account!
    if(!account_singed_in?)
      redirect_to sign_in_path, notice: 'You must sign in first to access this page'
    else
      ActiveApi.init_auth(current_account)
    end
  end

  def after_sign_in_path
    previous_page || root_url
  end

  def after_sign_out_path
    sign_in_path
  end

  def track_previous_page
    return nil if request.xhr?

    path = request.fullpath
    if(path != sign_in_path && path != sign_out_path && !request.xhr? )
      store_previous_page path
    end
  end

  def store_previous_page path
    session[:previous_page] = path
  end

  def previous_page
    session[:previous_page]
  end

  def inject_params options
    options[:account_id] = current_account.id
    options
  end

  def render_bad_request
    head :bad_request
  end
end