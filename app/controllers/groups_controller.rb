class GroupsController < ApplicationController
  def index
    render json: Group.all.order("id desc")
  end

  def create
  	group = Group.new(filter_params)
  	if group.save
  		render json: group, status: 201
		else
			head :bad_request
  	end
  end

  def destroy
    begin
      group = Group.find(params[:id])
      group.destroy
      head :ok
    rescue
      head :bad_request
    end

  end

  private
  def filter_params
    inject_params(params.require(:group).permit(:name, addresses: []))
  end
end