import React, { Component } from 'react';
import Ticketdata from './Ticketdata';
import TicketForm from './TicketForm';
import SeatGeekData from './SeatGeekData';
import BandsInTownData from './BandsInTownData';
import RecommendedData from './RecommendedData';


class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [],
      seatGeek: [],
      bandsInTown: [],
      bandsInTownEvent: [],
      recommended: [],
      seatGeekEvents: [],
      tickeMasterEvent: [],
      bandsInTownEvent: [],
      recommendedEvent: [],
      search: '',
      date: ''
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
     this.handleClickGeek = this.handleClickGeek.bind(this);
     this.handleClickTicketMaster = this.handleClickTicketMaster.bind(this);
     this.handleClickBand = this.handleClickBand.bind(this);
     this.handleClickRecommended = this.handleClickRecommended.bind(this);
  }
  handleClickRecommended(event) {
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      console.log("clicked")
      this.setState({ recommendedEvent: data });
    });
  }

  handleClickBand(event) {
    $.ajax({
      url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid&date=${event}`,
      dataType: 'jsonp'
    })
    .done(data => {
      console.log('clicked...getting data')
      this.setState({ bandsInTownEvent: data });
    });
  }

  handleClickGeek(event) {
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeekEvents: data });
    });
  }

  handleClickTicketMaster(event) {
    $.ajax({
      url: '/api/events',
      data: { event_id: event, site: 'ticketmasterEvent' },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ tickeMasterEvent: data });
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: '/api/events',
      data: {keyword: this.state.search, site: 'ticketmaster', date: this.state.date},
      dataType: 'json'
    })
    .done(data => {
      this.setState({ ticket: data.ticketmasterData._embedded.events });
    });

    event.preventDefault();
    $.ajax({
      url: `https://api.seatgeek.com/2/events?q=${this.state.search}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeek: data.events });
      $.ajax({
        url: '/api/events',
        data: { performer_id: data.events[0].performers[0].id, site: 'recommended', zip: '02466' },
        dataType: 'json'
      })
      .done(data => {
        this.setState({ recommended: data.recommendedEvents.recommendations });
      });

    });

    event.preventDefault();

    $.ajax({
      url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid`,
      dataType: 'jsonp'
    })
    .done(data => {
      this.setState({ bandsInTown: data });
    });
  }

  handleChange(event) {
    let newSearch = event.target.value;
    this.setState({ search: newSearch });
  }

  handleDateChange(event) {
    let newDate = event.target.value;
    this.setState({ date: newDate });
  }

  render() {
    let recommendedDatas = this.state.recommended.map(recommendedData => {
      let clickTargetRecommended = () => this.handleClickRecommended(recommendedData.event.id)
      return (
        <RecommendedData
        key={recommendedData.event.id}
        id={recommendedData.event.id}
        title={recommendedData.event.title}
        venue={recommendedData.event.venue.name}
        city={recommendedData.event.venue.city}
        recommendedEvent={this.state.recommendedEvent}
        handleClickRecommended={clickTargetRecommended}
        />
      );
    });
    let bandsInTownDatas = this.state.bandsInTown.map(bandsInTownData => {
      let clickBandTarget = () => this.handleClickBand(bandsInTownData.datetime.slice(0,10))
      return (
        <BandsInTownData
        key={bandsInTownData.id}
        id={bandsInTownData.id}
        title={bandsInTownData.title}
        venue={bandsInTownData.venue.name}
        city={bandsInTownData.venue.city}
        date={bandsInTownData.datetime.slice(0,10)}
        formatedDate={bandsInTownData.formatted_datetime}
        bandsInTownEvent={this.state.bandsInTownEvent}
        handleClickBand={clickBandTarget}
        />
      );
    });
    let seatGeekDatas = this.state.seatGeek.map(seatGeekData => {
      let clickTarget = () => this.handleClickGeek(seatGeekData.id)
      return (
        <SeatGeekData
        key={seatGeekData.id}
        id={seatGeekData.id}
        title={seatGeekData.title}
        venue={seatGeekData.venue.name}
        city={seatGeekData.venue.city}
        seatGeekEvent={this.state.seatGeekEvents}
        handleClickGeek={clickTarget}
        />
      );
    });
    let ticketdatas = this.state.ticket.map(ticketdata => {
      let clickMasterTarget = () => this.handleClickTicketMaster(ticketdata.id)
      return (
        <Ticketdata
        key={ticketdata.id}
        id={ticketdata.id}
        url={ticketdata.url}
        name={ticketdata.name}
        venueName={ticketdata._embedded.venues[0].name}
        city={ticketdata._embedded.venues[0].city.name}
        date={ticketdata.dates.start.localDate}
        tickeMasterEvent={this.state.tickeMasterEvent}
        handleClickTicketMaster={clickMasterTarget}
        />
      );
    });
    return (
      <div>
        <div>
        <TicketForm
        handleFormSubmit={this.handleFormSubmit}
        handleChange={this.handleChange}
        handleDateChange={this.handleDateChange}
        handleEndDateChange={this.handleEndDateChange}
        search={this.state.search}
        date={this.state.date}
        endDate={this.state.endDate}
        />
        </div>
        <div>
          SeatGeek: {seatGeekDatas}
        </div>
        <div>
        Bandsintown: {bandsInTownDatas}
        </div>
        <div>
          Ticketmaster: {ticketdatas}
        </div>
        <div>
          Recommnended Events: {recommendedDatas}
        </div>
      </div>
    );
  }
}

export default Ticket;
