class ApplicationController < ActionController::Base
  protect_from_forgery

  after_action :track_previous_page
  before_action :authenticate_user!


  helper_method :current_access, :user_singed_in?, :instance

  def sign_in auth
    session[:auth] = auth
  end

  def sign_out
    session[:auth] = nil
  end

  def user_singed_in?
    session[:auth].present?
  end

  def current_access
    session[:auth]
  end

  def authenticate_user!
    if(!user_singed_in?)
      redirect_to sign_in_path, notice: 'You must sign in first to access this page'
    else
      ActiveApi.init_auth(current_access)
    end
  end

  def after_sign_in_path
    previous_page || call_logs_path
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

  def instance
    @instance ||= Instance.find_by end_point: endpoint_name
    @instance
  end

  def endpoint_name
    current_access[:endpoint]
  end

  def with_instance filter
    filter[:instance_id] = instance.id
    filter
  end
end