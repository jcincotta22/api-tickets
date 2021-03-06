module EventHelper
  def get_ticket_data(user, ticket)
    if ticket.site == 'ticketmaster'
      if user
        ticket.save
        SearchHistory.create(user_id: user.id, ticket_id: ticket.id)
      end
      ticketmasterData = ticket.get_data_ticketmaster_events(ENV["TICKETMASTER_KEY"], ticket.keyword, ticket.date, ticket.end_date)
      render json: { ticketmasterData: ticketmasterData }, status: :ok
    elsif ticket.site == 'ticketmasterEvent'
      ticket.event_id = params[:ticket][:event_id]
      ticketmasterEvent = ticket.get_data_ticketmaster_event(ENV["TICKETMASTER_KEY"], ticket.event_id)
      render json: { ticketmasterEvent: ticketmasterEvent }, status: :ok
    elsif ticket.site == 'recommended'
      recommendedEvents = ticket.get_data_recommondation(ENV["SEATGEEK_KEY"], ticket.performer_id, ticket.zip)
      render json: { recommendedEvents: recommendedEvents }, status: :ok
    elsif ticket.site == 'seatGeek'
      seatGeekData = ticket.get_data_seat_geek(ENV["SEATGEEK_KEY"], ticket.date, ticket.end_date, ticket.keyword)
      render json: { seatGeekData: seatGeekData }, status: :ok
    elsif ticket.site == 'clickedSG'
      seatGeekData = ticket.get_data_clicked_seat_geek(ENV["SEATGEEK_KEY"], ticket.event_id)
      render json: { seatGeekData: seatGeekData }, status: :ok
    else
      render json: { errors: ticket.errors }, status: :unprocessable_entity
    end
  end

end
