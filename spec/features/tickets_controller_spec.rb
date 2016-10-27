require 'rails_helper'

feature "Index page" do
  scenario "viewing the index page", js: true do
    user = FactoryGirl.create(:user)
    login_as(user, scope: :user)
    visit root_path
    expect(page).to have_content("eventTrackr")
    expect(page).to have_content("Search History")
    expect(page).to have_content("©2016 eventTrackr")
    expect(page).to have_content("Saved Event Bucket")
    expect(page).to have_content("Search for your favorite artist above. Enter a date range for the event.
      Entering a zip code will retrieve recommended events near you!")
    expect(page).to have_content("Recommended By Us")
    expect(page).to have_content("Edit Profile")
    expect(page).to have_content("Logout")
  end
end

describe TicketsController, type: :controller do
  it "renders the index template" do
      get :index
      expect(response).to render_template("index")
      expect(response.body).to eq ""
  end
  it "has a 200 status code" do
    get :index
    expect(response.status).to eq(200)
  end
end
