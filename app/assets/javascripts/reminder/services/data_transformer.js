reminder.factory("DataTransformer",function(){
  return {
    schedule: function(scheduleResource){
      return this._scheduleTrans(scheduleResource);
    },

    _scheduleTrans: function(scheduleResource){
      if(scheduleResource.client_start_date){
        scheduleResource.client_start_date = new Date(scheduleResource.client_start_date)
      }
      else{
        scheduleResource.client_start_date = new Date();
      }
      return scheduleResource
    }
  }
});