require 'rails_helper'

describe SavedEvent do
  let(:user) { FactoryGirl.create(:user) }
  let(:saved_event) do
    SavedEvent.create(user_id: user.id, site: "seatGeek",
      keyword: "adele", date: "2016-10-30", end_date: "2016-10-30", event_id: '123456')
  end

  it 'has the expected properties' do
    expect(saved_event.user_id).to eq(user.id)
    expect(saved_event.site).to eq("seatGeek")
    expect(saved_event.keyword).to eq("adele")
    expect(saved_event.date).to eq("2016-10-30")
    expect(saved_event.end_date).to eq("2016-10-30")
    expect(saved_event.event_id).to eq('123456')
  end

  it { should have_valid(:user_id).when(1, 12) }
  it { should_not have_valid(:user_id).when(nil, '', 'word') }

  it { should have_valid(:site).when("ticketmaster", "seatgeek") }
  it { should_not have_valid(:site).when(nil, '') }

  it { should have_valid(:keyword).when("adele", "kanye") }

  it { should have_valid(:date).when('2016-10-20', '2016-12-20') }

  it { should have_valid(:event_id).when(1, 12) }

  it { should have_valid(:end_date).when('2016-10-20', '2016-12-20') }

end
