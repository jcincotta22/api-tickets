class Ticket < ActiveRecord::Base

  def get_data_ticketmaster_event(key, event_id)
    uri = URI("https://app.ticketmaster.com/discovery/v2/events/#{event_id}.json?apikey=#{key}")
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def get_data_ticketmaster_events(key, keyword, date)
    uri = URI("https://app.ticketmaster.com/discovery/v2/events.json?keyword=#{keyword}&countryCode=US&startDateTime=#{date}T00:00:00Z&apikey=#{key}")
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def get_data_seatgeek_events(keyword)
    uri = URI('https://api.seatgeek.com/2/events?q=#{keyword}')
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

end
