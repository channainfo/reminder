class SchedulesController < ApplicationController
  def index
    render json: Schedule.all.order("id desc")
  end

  def show
    schedule = Schedule.find(params[:id])
    render json: schedule
  end

  def create
    schedule = Schedule.new(protected_params)
    schedule.conditions = params[:schedule][:conditions]
    schedule.channels   = params[:schedule][:channels]

    if schedule.save
      render json: schedule, status: 201
    else
      render_bad_request
    end
  end

  def update
    schedule = Schedule.find(params[:id])
    schedule.conditions = params[:schedule][:conditions]
    schedule.channels   = params[:schedule][:channels]

    if schedule.update_attributes(protected_params)
      render json: schedule
    else
      render_bad_request
    end
  end

  def destroy
    begin
      schedule = Schedule.find(params[:id])
      schedule.destroy
      head :ok
    rescue
      render_bad_request
    end

  end

  private
  def protected_params
    attrs = params.require(:schedule).permit(:group_id,
                  :call_flow_id, :start_date, :from,
                  :to, :retries, :is_repeated, channels: [])

    inject_params(attrs)
  end
end