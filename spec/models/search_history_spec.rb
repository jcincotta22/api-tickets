require 'rails_helper'

describe SearchHistory do
  let(:user) { FactoryGirl.create(:user) }
  let(:ticket) { FactoryGirl.create(:ticket) }
  let(:search_history) {SearchHistory.create(user_id: user.id, ticket_id: ticket.id) }
  
  it 'has the expected properties' do
    expect(search_history.user_id).to eq(user.id)
    expect(search_history.ticket_id).to eq(ticket.id)
    expect(search_history.user.first_name).to eq(user.first_name)
  end

  it { should have_valid(:user_id).when(1, 12) }
  it { should_not have_valid(:user_id).when(nil, '', 'word') }

  it { should have_valid(:ticket_id).when(1, 12) }
  it { should_not have_valid(:ticket_id).when(nil, '', 'word') }

end
