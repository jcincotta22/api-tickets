
![Build Status](https://codeship.com/projects/17a76d30-7bc9-0134-0ef8-1a0a4897d69c/status?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/jcincotta22/api-tickets/badge.svg?branch=master)](https://coveralls.io/github/jcincotta22/api-tickets?branch=master)

# eventTrackr

An app where users search for events and receive search results from multiple websites selling the event. Developed with a full React.js front end, with a light Rails backend. API used are: seatgeek, Ticketmaster, and bandsintown. Some of the features include saved event searches and recommended events for users. Integrated Bootstrap, and Devise for user authentication.

This project utilizes the following libraries and frameworks:
  * React.js
  * javascript
  * AJAX
  * Ruby on rails
  * Bootstrap

## Setting up eventTrackr

1. Clone: https://github.com/jcincotta22/api-tickets
2. You will need to get a Ticketmaster, and SeatGeek API key from their respective developer websites.
3. You will need to update your .env file with your Ticketmaster and SeatGeek API Key.  It should look like this.
  *  `TICKETMASTER_KEY=<YOUR TICKETMASTER API KEY>`
  *  `SEATGEEK_KEY=<YOUR SEATGEEK API KEY>`
4. rake db:create
5. rake db:migrate
6. npm install
7. npm start
8. rails s
9. Visit: https://localhost:3000
