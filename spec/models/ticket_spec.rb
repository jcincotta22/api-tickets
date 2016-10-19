require 'rails_helper'

describe Ticket do
  let(:ticket) do
    Ticket.create(site: 'ticketmaster', keyword: 'Adele', date: '2016-10-20', event_id: '123456', zip: '02466', performer_id: '141', end_date: '2016-12-30')
  end
  it 'has the expected properties' do
    expect(ticket.site).to eq('ticketmaster')
    expect(ticket.keyword).to eq('Adele')
    expect(ticket.date).to eq('2016-10-20')
    expect(ticket.event_id).to eq('123456')
    expect(ticket.zip).to eq('02466')
    expect(ticket.performer_id).to eq('141')
    expect(ticket.end_date).to eq('2016-12-30')
  end
  it { should have_valid(:site).when('ticketmaster', 'seatgeek') }

  it { should have_valid(:date).when('2016-10-20', '2016-12-20') }
  it { should_not have_valid(:date).when(nil, '') }

  it { should have_valid(:zip).when('02466', '14256') }
  it { should_not have_valid(:zip).when('124566', 'words', '123fd') }

  it { should have_valid(:performer_id).when('141', '1234') }

  it { should have_valid(:end_date).when('2016-10-20', '2016-12-20') }
  it { should_not have_valid(:end_date).when(nil, '') }
end
