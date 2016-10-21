class SavedEvent < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, message: 'must be signed in'
  validates :user_id, numericality: { only_integer: true }
  validates :site, presence: true

  def get_saved_events(event)
    if event.site = "ticketmaster"
      event_id = event.event_id
      uri = URI("https://app.ticketmaster.com/discovery/v2/events/#{event_id}.json?apikey=#{key}")
      response = Net::HTTP.get_response(uri)
      JSON.parse(response.body)
    elsif event.site = "bandsInTown"
      date = event.date
      keyword = event.keyword
      uri = URI("http://api.bandsintown.com/artists/#{keyword}/events.json?api_version=2.0&app_id=myid&date=#{date}")
      response = Net::HTTP.get_response(uri)
      JSON.parse(response.body)

    elsif event.site = "recommended"
      event = event.event_id
      uri = URI("https://api.seatgeek.com/2/events/#{event}")
      response = Net::HTTP.get_response(uri)
      JSON.parse(response.body)

    else event.site = "seatGeek"
      event = event.event_id
      uri = URI("https://api.seatgeek.com/2/events/#{event}")
      response = Net::HTTP.get_response(uri)
      JSON.parse(response.body)
    end
  end
end
