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
      expect(res_body)
    end
  end
end
