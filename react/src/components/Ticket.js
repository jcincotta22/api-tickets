import React, { Component } from 'react';
import Ticketdata from './Ticketdata';
import TicketForm from './TicketForm';
import SeatGeekData from './SeatGeekData';


class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [],
      seatGeek: [],
      stubHub: [],
      seatGeekEvents: [],
      tickeMasterEvent: [],
      search: '',
      date: ''
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
     this.handleClickGeek = this.handleClickGeek.bind(this);
     this.handleClickTicketMaster = this.handleClickTicketMaster.bind(this);
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
    });

    event.preventDefault();
    $.ajax({
      url: `https://www.stubhub.com/listingCatalog/select?wt=json&indent=on&q=stubhubDocumentType:event%20AND%20description:new%20england%20AND%20description:patriots&event_date=2016-11-01TO%202016-12-05
      `,
      dataType: 'json'
    })
    .done(data => {
      debugger;
      this.setState({ stubHub: data.events });
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
          Ticketmaster: {ticketdatas}
        </div>
      </div>
    );
  }
}

export default Ticket;
