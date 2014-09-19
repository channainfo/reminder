class GroupsController < ApplicationController
  def index
    render json: Group.all.order("id desc")
  end

  def show
    group = Group.find(params[:id])
    render json: group
  end

  def create
  	group = Group.new(filter_params)
  	if group.save
  		render json: group, status: 201
		else
			render_bad_request
  	end
  end

  def update
    group = Group.find(params[:id])
    if group.update_attributes(filter_params)
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
  def filter_params
    inject_params(params.require(:group).permit(:name, addresses: []))
  end
end