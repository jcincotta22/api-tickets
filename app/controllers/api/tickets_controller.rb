class Api::TicketsController < ApiController
  skip_before_action :verify_authenticity_token

  def events
    ticket = Ticket.new(ticket_params)
    user = current_user
    if ticket.site == 'ticketmaster'
      if user
        ticket.save
        SearchHistory.create(user_id: user.id, ticket_id: ticket.id)
      end
      ticketmasterData = ticket.get_data_ticketmaster_events(ENV["TICKETMASTER_KEY"], ticket.keyword, ticket.date, ticket.end_date)
      render json: { ticketmasterData: ticketmasterData }, status: :ok
    elsif ticket.site == 'seatgeek'
      seatgeekData = ticket.get_data_seatgeek_events(ticket.keyword)
      render json: { seatgeekData: seatgeekData }, status: :ok
    elsif ticket.site == 'ticketmasterEvent'
      ticket.event_id = params[:ticket][:event_id]
      ticketmasterEvent = ticket.get_data_ticketmaster_event(ENV["TICKETMASTER_KEY"], ticket.event_id)
      render json: { ticketmasterEvent: ticketmasterEvent }, status: :ok
    elsif ticket.site == 'recommended'
      recommendedEvents = ticket.get_data_recommondation(ENV["SEATGEEK_KEY"], ticket.performer_id, ticket.zip)
      render json: { recommendedEvents: recommendedEvents }, status: :ok
    else
      render json: { errors: ticket.errors }, status: :unprocessable_entity
    end
  end

  def create
    ticket = Ticket.new(ticket_params)
    user = current_user
    if ticket.site == 'seatGeek'
      if user
        search_history = user.search_histories.last
        saved_event = SavedEvent.new(site: ticket.site, user_id: user.id, search_history_id: search_history.id, event_id: ticket.event_id)
        saved_event.save
        success = "Event was saved to your Event Bucket"
        render json: { success: success }, status: :ok
      else
        error_message = "User must be signed in to save this event"
        render json: { error_message: error_message }, status: :ok
      end
    elsif ticket.site == 'ticketmaster'
      if user
        search_history = user.search_histories.last
        saved_event = SavedEvent.new(site: ticket.site, user_id: user.id, search_history_id: search_history.id, event_id: ticket.event_id)
        saved_event.save
        success = "Event was saved to your Event Bucket"
        render json: { success: success }, status: :ok
      else
        error_message = "User must be signed in to save this event"
        render json: { error_message: error_message }, status: :ok
      end
    elsif ticket.site == 'bandsInTown'
      if user
        search_history = user.search_histories.last
        saved_event = SavedEvent.new(site: ticket.site, user_id: user.id, search_history_id: search_history.id, event_id: ticket.date, keyword: ticket.keyword)
        saved_event.save
        success = "Event was saved to your Event Bucket"
        render json: { success: success }, status: :ok
      else
        error_message = "User must be signed in to save this event"
        render json: { error_message: error_message }, status: :ok
      end
    elsif ticket.site == 'recommended'
      if user
        search_history = user.search_histories.last
        saved_event = SavedEvent.new(site: ticket.site, user_id: user.id, search_history_id: search_history.id, event_id: ticket.event_id)
        saved_event.save
        success = "Event was saved to your Event Bucket"
        render json: { success: success }, status: :ok
      else
        error_message = "User must be signed in to save this event"
        render json: { error_message: error_message }, status: :ok
      end
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:keyword, :site, :date, :zip, :performer_id, :end_date, :performer_id, :event_id)
  end
end
