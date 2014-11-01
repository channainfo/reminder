class CallFlowsController < ApplicationController
  def index
    projects  = Api::CallFlow.all(account_id: current_account.id, 
                                       project_id: params[:project_id])
    render json: projects
  end
end
