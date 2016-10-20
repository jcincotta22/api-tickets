class Api::SavedEventsController < ApiController
  def index
    user = current_user
    if user
      saved_events = user.saved_events.get_saved_events
      if saved_events
        render json: { savedEvents: saved_events }, status: :ok
      else
        render json: { savedEvents: "You have no saved Events"}
      end
    else
      render json: { savedEvents: "Must Be Signed In to View Saved Events"}
    end
  end
end
