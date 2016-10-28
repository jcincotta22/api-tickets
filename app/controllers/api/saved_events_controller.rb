class Api::SavedEventsController < ApiController
  skip_before_action :verify_authenticity_token
  include SavedEventsHelper
  def index
    user = current_user
    get_saved_events(user)
  end


  def create
    saved_event = SavedEvent.new(event_params)
    user = current_user
    save_events(saved_event, user)
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
