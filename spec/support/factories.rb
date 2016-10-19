FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@gmail.com" }
    sequence(:password) { |n| "password#{n}" }
    sequence(:first_name) { |n| "John#{n}" }
    sequence(:last_name) { |n| "Smith#{n}" }
  end
end

FactoryGirl.define do
  factory :ticket do
    keyword "adele"
    site "ticketmaster"
    date "2016-10-30"
    end_date "2016-12-30"
    zip "02456"
    event_id "123456"
  end
end

FactoryGirl.define do
  factory :search_history do
    user
    ticket
  end
end

FactoryGirl.define do
  factory :saved_event do
    user
    search_history
    site 'ticketmaster'
    keyword "kanye"
    event_id "123456"
  end
end
