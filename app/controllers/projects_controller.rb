class ProjectsController < ApplicationController
  def index
    @projects  = Service::Project.all(account_id: current_account.id)
    render json: @projects
  end
end
