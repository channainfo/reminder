class SessionsController < ApplicationController
  skip_before_action :authenticate_account!, only: [:new, :create]

  def new
    if account_singed_in?
      redirect_to after_sign_in_path, notice: 'You already signed in'
    else
      @login_form = LoginForm.new
      render layout: "layouts/sign_in"
    end
  end

  def create
    @login_form = LoginForm.new filter_params

    if(@login_form.valid?)
      account = Session.login(ENV["END_POINT"], filter_params[:email], filter_params[:password])
      if(Session.success?)
        sign_in(account)
        redirect_to root_url
      else
        flash.now[:error]  = "Failed to login"
        render_new
      end
    else
      render_new
    end
  end

  def destroy
    sign_out
    redirect_to sign_in_path
  end

  def filter_params
    params.require(:login_form).permit(:email, :password)
  end

  def render_new
    render :new, layout: "layouts/sign_in"
  end

end