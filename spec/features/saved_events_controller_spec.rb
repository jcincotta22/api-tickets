require 'rails_helper'

describe Api::SavedEventsController, type: :controller do
  feature "create saved event" do
    scenario 'creates a new SavedEvent from bandsInTown if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      post :create, params: { saved_event: { date: '2016-10-31', site: 'bandsInTown', keyword: 'Adele', title: 'Adele', url: 'www.tickets.com' } }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Event was saved to your Event Bucket")
      expect(res_body['message']).not_to be("User must be signed in to save this event")

      saved_event = SavedEvent.last
      expect(saved_event.user_id).to eq(user.id)
    end

    scenario 'creates a new SavedEvent from bandsInTown if user is signed in' do
      post :create, params: { saved_event: { date: '2016-10-31', site: 'bandsInTown', keyword: 'Adele', title: 'Adele', url: 'www.tickets.com' } }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).not_to eq("Event was saved to your Event Bucket")
      expect(res_body['message']).to eq("User must be signed in to save this event")
    end


    scenario 'creates a new SavedEvent from ticketmaster if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      post :create, params: { saved_event: { date: '2016-10-31', site: 'ticketmaster', keyword: 'Adele', title: 'Adele', url: 'www.tickets.com' } }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Event was saved to your Event Bucket")
      expect(res_body['message']).not_to be("User must be signed in to save this event")

      saved_event = SavedEvent.last
      expect(saved_event.user_id).to eq(user.id)
    end

    scenario 'creates a new SavedEvent from seatgeek if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      post :create, params: { saved_event: { date: '2016-10-31', site: 'seatGeek', keyword: 'Adele', title: 'Adele', url: 'www.tickets.com' } }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Event was saved to your Event Bucket")
      expect(res_body['message']).not_to be("User must be signed in to save this event")

      saved_event = SavedEvent.last
      expect(saved_event.user_id).to eq(user.id)
    end
  end

  feature "delete saved event" do
    scenario 'deletes a new SavedEvent if user is signed in' do
      saved_event = FactoryGirl.create(:saved_event)
      user = saved_event.user
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      delete :destroy, params: { id: saved_event.id }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Event has been deleted")
      expect(res_body['message']).not_to be(nil)

      expect { SavedEvent.find(saved_event.id) }.to raise_exception(ActiveRecord::RecordNotFound)
    end
  end

  feature "get saved events" do
    scenario 'Gets all SavedEvent if user is signed in' do
      user = FactoryGirl.create(:user)
      saved_events = FactoryGirl.create_list(:saved_event, 2, user_id: user.id)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      get :index
      expect(response.content_type).to eq "application/json"
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['savedEvents'][0]['site']).to eq(saved_events.first.site)
      expect(res_body['savedEvents'][1]['site']).to eq(saved_events.last.site)
      expect(res_body['savedEvents'][0]['keyword']).to eq(saved_events.first.keyword)
      expect(res_body['savedEvents'][1]['keyword']).to eq(saved_events.last.keyword)
      expect(res_body['savedEvents'][0]['title']).to eq(saved_events.first.title)
      expect(res_body['savedEvents'][1]['title']).to eq(saved_events.last.title)
      expect(res_body['savedEvents'][0]['url']).to eq(saved_events.first.url)
      expect(res_body['savedEvents'][1]['url']).to eq(saved_events.last.url)
      expect(res_body['savedEvents'][0]['user_id']).to eq(saved_events.first.user.id)
      expect(res_body['savedEvents'][1]['user_id']).to eq(saved_events.last.user.id)
      expect(res_body['savedEvents'].empty?).not_to be(true)
    end
    scenario 'Gets all SavedEvent if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get :index
      expect(response.content_type).to eq "application/json"
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['savedEvents'].empty?).to eq(true)
    end

    scenario 'is not able to look at saved events if not signedi n' do
      get :index
      expect(response.content_type).to eq "application/json"
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['savedEvents'].empty?).to eq(true)
    end
  end
end
