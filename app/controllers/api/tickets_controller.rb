require 'pry'
class Api::TicketsController < ApiController

  def events
    ticket = Ticket.new(site: params[:site], keyword: params[:keyword], date: params[:date])
    if ticket.site == 'ticketmaster'
      ticketmasterData = ticket.get_data_ticketmaster_events(ENV["TICKETMASTER_KEY"], ticket.keyword, ticket.date)
      render json: { ticketmasterData: ticketmasterData }, status: :ok
    elsif ticket.site == 'seatgeek'
      seatgeekData = ticket.get_data_seatgeek_events(ticket.keyword)
      render json: { seatgeekData: seatgeekData }, status: :ok
    elsif ticket.site == 'ticketmasterEvent'
      ticket.event_id = params[:event_id]
      ticketmasterEvent = ticket.get_data_ticketmaster_event(ENV["TICKETMASTER_KEY"], ticket.event_id)
      render json: { ticketmasterEvent: ticketmasterEvent }, status: :ok
    else
      render json: { errors: ticket.errors }, status: :unprocessable_entity
    end
  end

  private

  # def event_params
  #   params.require(:ticket).permit(:keyword, :date)
  # end
end
