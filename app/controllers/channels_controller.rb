class ChannelsController < ApplicationController
  def index
    conditions = {}
    conditions[:account_id] = params[:account_id] if(params[:account_id])
    @channels  = Api::Channel.all(conditions)
    
    render json: @channels

  end
end
