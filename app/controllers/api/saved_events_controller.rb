class Api::SavedEventsController < ApiController
  skip_before_action :verify_authenticity_token

  def index
    user = current_user
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


  def create
    saved_event = SavedEvent.new(event_params)
    user = current_user
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

  def destroy
    SavedEvent.destroy(params[:id])
    message = "Event has been deleted"
    render json: { message: message }, status: :ok
  end

  private

  def event_params
    params.require(:saved_event).permit(:keyword, :site, :date, :end_date, :title, :url)
  end

end
