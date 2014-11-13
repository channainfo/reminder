class ReminderSchedulesController < ApplicationController
  def index
    render json: schedules_by_project
  end

  def show
    render json: Api::ReminderSchedule.find(params[:id])
  end

  def create
    Api::ReminderSchedule.create(params)
    head :created
  end

  def update
    if Api::ReminderSchedule.update(params[:id], params)
      head :ok
    else
      render_bad_request
    end
  end

  def destroy
    if Api::ReminderSchedule.destroy(params[:id])
      head :ok
    else
      render_bad_request
    end
  end

  private

  def schedules_by_project
    Api::ReminderSchedule.collection(params[:project_id])
  end

end