class ProjectsController < ApplicationController
  def index
    @projects  = Api::Project.all(account_id: current_account.id)
    render json: @projects
  end
end
