class ScheduleSerializer < BaseSerializer
  attributes :id, :project_id, :call_flow_id, :group_id, :is_repeated,
             :start_date, :from, :to, :conditions, :retries_in_hours, :channels

end