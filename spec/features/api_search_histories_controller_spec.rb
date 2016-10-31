require 'rails_helper'

describe Api::SearchHistoriesController, type: :controller do
  include SearchHistoryHelper
  feature "User can view their search_history" do
    scenario 'clicks on search history link and sees search history' do
      user = FactoryGirl.create(:user)
      search_history = FactoryGirl.create_list(:search_history, 5, user_id: user.id)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      get :index
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
      res_body = JSON.parse(response.body)
      first_history = user.search_histories.first.ticket
      expect(res_body['searchHistory'].length).to eq(5)
      # expect(res_body['searchHistory'][0]).to eq(search_history.first)
      # expect(res_body['searchHistory'][4]).to eq(search_history.last)
      expect(res_body['searchHistory'][0]['keyword']).to eq(first_history.keyword)
      expect(res_body['searchHistory'][0]['date']).to eq(first_history.date)
      expect(res_body['searchHistory'][0]['zip']).to eq(first_history.zip)
      expect(res_body['searchHistory'][0]['event_id']).to eq(first_history.event_id)
    end

    scenario 'authenticated user without a search history gets not results' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      get :index
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
      res_body = JSON.parse(response.body)
      expect(res_body['searchHistory'].length).to eq(0)
    end

    scenario 'non authenticated user clicks on search history link' do
      get :index
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
      res_body = JSON.parse(response.body)
      expect(res_body['searchHistory'].length).to eq(0)
      expect(res_body['message']).to eq("You must sign in to view your search history")
      expect(res_body['message']).not_to be(nil)
    end

    scenario 'user clears search history' do
      user = FactoryGirl.create(:user)
      search_history = FactoryGirl.create_list(:search_history, 5, user_id: user.id)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      expect(user.search_histories.length).to eq(5)
      delete :delete_all
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("Your Search History Has Been Deleted")
      expect(res_body['message']).not_to be(nil)
      expect { SearchHistory.find(search_history.first.id) }.to raise_exception(ActiveRecord::RecordNotFound)
      expect { SearchHistory.find(search_history.last.id) }.to raise_exception(ActiveRecord::RecordNotFound)
    end

    scenario 'user tries to clear a non existent search history' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, :scope => :user)
      expect(user.search_histories.length).to eq(0)
      delete :delete_all
      expect(response.status).to eq(200)
      res_body = JSON.parse(response.body)
      expect(res_body['message']).to eq("You do not have a search history")
      expect(res_body['message']).not_to be(nil)
    end
  end
end
