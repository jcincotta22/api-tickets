require 'rails_helper'

describe SavedEvent do
  let(:search_history) { FactoryGirl.create(:search_history)}
  let(:saved_event) do
    SavedEvent.create(user_id: search_history.user.id, site: search_history.ticket.site,
    search_history_id: search_history.id, keyword: search_history.ticket.keyword,
    date: search_history.ticket.date, end_date: search_history.ticket.end_date,
    event_id: search_history.ticket.event_id)
  end

  it 'has the expected properties' do
    expect(saved_event.user_id).to eq(search_history.user.id)
    expect(saved_event.search_history_id).to eq(search_history.id)
    expect(saved_event.site).to eq(search_history.ticket.site)
    expect(saved_event.keyword).to eq(search_history.ticket.keyword)
    expect(saved_event.date).to eq(search_history.ticket.date)
    expect(saved_event.end_date).to eq(search_history.ticket.end_date)
    expect(saved_event.event_id).to eq(search_history.ticket.event_id)
  end

  it { should have_valid(:user_id).when(1, 12) }
  it { should_not have_valid(:user_id).when(nil, '', 'word') }

  it { should have_valid(:search_history_id).when(1, 12) }
  it { should_not have_valid(:search_history_id).when(nil, '', 'word') }

  it { should have_valid(:site).when("ticketmaster", "seatgeek") }
  it { should_not have_valid(:site).when(nil, '') }

  it { should have_valid(:keyword).when("adele", "kanye") }

  it { should have_valid(:date).when('2016-10-20', '2016-12-20') }

  it { should have_valid(:event_id).when(1, 12) }

  it { should have_valid(:end_date).when('2016-10-20', '2016-12-20') }

end
