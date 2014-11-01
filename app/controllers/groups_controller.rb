class GroupsController < ApplicationController
  def index
    render json: groups_by_project
  end

  def collection
    render json: groups_by_project, each_serializer: GroupInfoSerializer
  end

  def show
    group = Group.find(params[:id])
    render json: group
  end

  def create
  	group = Group.new(protected_params)
    group.addresses = params[:group][:addresses] || []
  	if group.save
  		render json: group, status: 201
		else
			render_bad_request
  	end
  end

  def groups_by_project
    groups = Group.all
    if params[:project_id].present?
      groups = groups.where(project_id: params[:project_id] )
    end
    groups
  end

  def update
    group = Group.find(params[:id])
    group.addresses = params[:group][:addresses] || []
    if group.update_attributes(protected_params)
      render json: group
    else
      render_bad_request
    end
  end

  def destroy
    begin
      group = Group.find(params[:id])
      group.destroy
      head :ok
    rescue
      render_bad_request
    end

  end

  private

  def protected_params
    inject_params(params.require(:group).permit(:project_id, :name))
  end
end