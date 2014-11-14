class ReminderGroupsController < ApplicationController
  def index
    render json: groups_by_project
  end

  def collection
    render json: groups_by_project
  end

  def show
    reminder_group = Api::ReminderGroup.find(params[:id])
    render json: reminder_group
  end

  def create
    Api::ReminderGroup.create(params)
    head :created
  end

  def update
    if Api::ReminderGroup.update(params[:id], params)
      head :ok
    else
      render_bad_request
    end
  end

  def destroy
    if Api::ReminderGroup.destroy(params[:id])
      head :ok
    else
      render_bad_request
    end
  end

  private

  def groups_by_project
    Api::ReminderGroup.collection(params[:project_id])
  end

end