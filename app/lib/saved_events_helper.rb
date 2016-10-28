module SavedEventsHelper
  def save_events(saved_event, user)
    if saved_event.site == 'ticketmaster'
      if user
        saved_event.user_id = user.id
        saved_event.save
        message = "Event was saved to your Event Bucket"
        render json: { message: message }, status: :ok
      else
        message = "User must be signed in to save this event"
        render json: { message: message }, status: :ok
      end
    elsif saved_event.site == 'bandsInTown'
      if user
        saved_event.user_id = user.id
        saved_event.save
        message = "Event was saved to your Event Bucket"
        render json: { message: message }, status: :ok
      else
        message = "User must be signed in to save this event"
        render json: { message: message }, status: :ok
      end
    elsif saved_event.site == 'seatGeek'
      if user
        saved_event.user_id = user.id
        saved_event.save
        message = "Event was saved to your Event Bucket"
        render json: { message: message }, status: :ok
      else
        message = "User must be signed in to save this event"
        render json: { message: message }, status: :ok
      end
    end
  end

  def get_saved_events(user)
    if user
      saved_events = user.saved_events.order(created_at: :desc).limit(8)
      if !saved_events.nil?
        render json: { savedEvents: saved_events }, status: :ok
      else
        render json: { savedEvents: [] }, status: :ok
      end
    else
      render json: { savedEvents: [] }, status: :ok
    end
  end
end
