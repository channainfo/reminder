class ScheduleSerializer < BaseSerializer
  attributes :channels, :call_flow_id, :group_id, :is_repeated,
             :start_date, :from, :to, :conditions, :retries, :id

end