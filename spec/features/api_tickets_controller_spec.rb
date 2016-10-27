require 'rails_helper'

describe Api::TicketsController, type: :controller, vcr: true do
  feature "saves ticket to search_history" do
    scenario 'creates a new SearchHistory if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      post :events, params: { ticket: { keyword: 'Adele', site: 'ticketmaster', date: '2016-10-15', end_date: '2016-10-31', zip: '02466' } }
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
      res_body = JSON.parse(response.body)
      name = res_body['ticketmasterData']['_embedded']['events'][0]['name']
      url = res_body['ticketmasterData']['_embedded']['events'][0]['url']
      expect(name).to eq('Adele')
      expect(url).to eq("http://ticketmaster.com/event/0D004F8BBC9A9D14")
      search_history = SearchHistory.last
      expect(search_history.user_id).to eq(user.id)
    end
      scenario 'makes a recommended event api call to seatgeek and returns data' do
        user = FactoryGirl.create(:user)
        allow(request.env['warden']).to receive(:authenticate!).and_return(user)
        allow(controller).to receive(:current_user).and_return(user)
        login_as(user, :scope => :user)
        post :events, params: { ticket: { keyword: 'Adele', site: 'recommended', date: '2016-10-15', end_date: '2016-10-31', zip: '02466', performer_id: '141'} }
        expect(response.status).to eq(200)
        expect(response.content_type).to eq "application/json"
        res_body = JSON.parse(response.body)
        title = res_body['recommendedEvents']['recommendations'][0]['event']['title']
        url = res_body['recommendedEvents']['recommendations'][0]['event']['url']
        expect(title).to eq("Shawn Mendes: Ariana Grande with iHeartRadio Jingle Ball and Jingle Ball and Diplo and Tove Lo")
        expect(url).to eq("https://seatgeek.com/shawn-mendes-ariana-grande-with-iheartradio-jingle-ball-and-jingle-ball-and-diplo-and-tove-lo-tickets/boston-massachusetts-td-garden-2016-12-11-6-pm/concert/3541173")
    end
      scenario 'makes a single event api call to ticketmaster and returns data' do
        user = FactoryGirl.create(:user)
        allow(request.env['warden']).to receive(:authenticate!).and_return(user)
        allow(controller).to receive(:current_user).and_return(user)
        login_as(user, :scope => :user)
        post :events, params: { ticket: { site: 'ticketmasterEvent', event_id: "vvG1zZKzRc-5_k"} }
        expect(response.status).to eq(200)
        expect(response.content_type).to eq "application/json"
        res_body = JSON.parse(response.body)
        name = res_body['ticketmasterEvent']['name']
        url = res_body['ticketmasterEvent']['url']
        expect(name).to eq("Adele")
        expect(url).to eq('http://ticketmaster.com/event/0E004F8BED84B646')
    end
  end
end
