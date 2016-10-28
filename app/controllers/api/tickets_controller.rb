class Api::TicketsController < ApiController
  skip_before_action :verify_authenticity_token
  include EventHelper
  def events
    ticket = Ticket.new(ticket_params)
    user = current_user
    get_ticket_data(user, ticket)
  end

  private

  def ticket_params
    params.require(:ticket).permit(:keyword, :site, :date, :zip, :performer_id, :end_date, :event_id)
  end

end
