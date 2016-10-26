require 'rails_helper'

feature 'user sign in' do
  scenario 'an existing user specifies a vailid email and pasword' do
    user = FactoryGirl.create(:user)
    visit root_path
    click_link 'Login'
    fill_in 'log-in-user-email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Login'
    expect(page).to have_content('Welcome Back!')
    expect(page).to have_content('Logout')
  end

  scenario 'a nonexistent email and password is supplied' do
    visit root_path
    click_link 'Login'
    fill_in 'log-in-user-email', with: 'nobody@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Login'
    expect(page).to have_content('Invalid Email or password.')
    expect(page).to_not have_content('Welcome Back!')
    expect(page).to_not have_content('Logout')

  end

  scenario 'an existing email with the wrong passord is denied access' do
    user = FactoryGirl.create(:user)
    visit root_path
    click_link 'Login'
    fill_in 'log-in-user-email', with: user.email
    fill_in 'Password', with: 'incorrectPassword'
    click_button 'Login'
    expect(page).to have_content('Invalid Email or password.')
    expect(page).to_not have_content('Welcome Back!')
    expect(page).to_not have_content('Logout')

  end

  scenario 'an already authenticated user cannot re-sign in' do
    user = FactoryGirl.create(:user)
    visit new_user_session_path
    fill_in 'log-in-user-email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Login'

    expect(page).to have_content('Logout')
    expect(page).to_not have_content('Login')

    visit new_user_session_path
    expect(page).to have_content('You are already signed in.')
  end

end
