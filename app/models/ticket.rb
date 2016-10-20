class Ticket < ActiveRecord::Base
  validates :date, presence: true
  validates :zip, length: { is: 5 }, numericality: true
  validates :date, presence: true
  validates :end_date, presence: true
  validates :keyword, presence: true

  def get_data_ticketmaster_event(key, event_id)
    uri = URI("https://app.ticketmaster.com/discovery/v2/events/#{event_id}.json?apikey=#{key}")
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def get_data_ticketmaster_events(key, keyword, date, end_date)
    uri = URI("https://app.ticketmaster.com/discovery/v2/events.json?keyword=#{keyword}&countryCode=US&startDateTime=#{date}T00:00:00Z&endDateTime=#{end_date}T00:00:00Z&apikey=0QPgNDZQrA6F0OqlOQTWY0bojjoT25TG")
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def get_data_recommondation(key, peroformer_id, zip)
    uri = URI("https://api.seatgeek.com/2/recommendations?performers.id=#{performer_id}&postal_code=#{zip}&client_id=#{key}")
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end
end
