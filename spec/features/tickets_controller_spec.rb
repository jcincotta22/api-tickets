require 'rails_helper'

feature "Index page" do
  scenario "viewing the index page" do
    visit root_path
    expect(page).to have_content("eventTrackr")
  end
end

RSpec.describe TicketsController, type: :controller do
  describe "index" do
    it "renders the index template" do
        get :index
        expect(response).to render_template("index")
        expect(response.body).to eq ""
    end
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end
  #   it "responds to html by default" do
  #    post :create, { :ticket { keyword: "Any Name" } }
  #    expect(response.content_type).to eq "text/html"
  #  end
   #
  #  it "responds to custom formats when provided in the params" do
  #    post :create, { :ticket { keyword: "Any Name" }, format: :json }
  #    expect(response.content_type).to eq "application/json"
  #  end
  end
end
