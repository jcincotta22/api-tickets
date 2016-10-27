require 'rails_helper'

describe Api::SavedEventsController, type: :controller do
  feature "create saved event" do
    scenario 'creates a new SavedEvent if user is signed in' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      post :create, params: { saved_event: { date: '2016-10-31', site: 'bandsInTown', keyword: 'Adele', title: 'Adele', url: 'www.tickets.com' } }
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Event was saved to your Event Bucket")
      expect(res_body['message']).not_to be("User must be signed in to save this event")

      saved_event = SavedEvent.first
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
end
