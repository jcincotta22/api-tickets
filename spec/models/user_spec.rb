require 'rails_helper'

describe User do
  let(:user) {User.create(first_name: 'jeff', last_name: 'Cee', email: 'jc@yahoo.com', password: 'password', sign_in_count: 1) }
  it 'has the expected properties' do
    expect(user.first_name).to eq('jeff')
    expect(user.last_name).to eq("Cee")
    expect(user.email).to eq("jc@yahoo.com")
    expect(user.password).to eq("password")
    expect(user.sign_in_count).to eq(1)
  end

  it { should have_valid(:first_name).when('John', 'Sally') }
  it { should_not have_valid(:first_name).when(nil, '') }

  it { should have_valid(:last_name).when('Smith', 'Swanson') }
  it { should_not have_valid(:last_name).when(nil, '') }

  it { should have_valid(:email).when('user@example.com', 'another@gmail.com') }
  it { should_not have_valid(:email).when(nil, '', 'urser', 'usersr@com', 'usersbl.com') }

  it 'has a matching password confirmation for the password' do
    user = User.new
    user.password = 'password'
    user.password_confirmation = 'anotherpassword'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end
end
