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
      seatGeekEvents: [],
      search: '',
      date: ''
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
     this.handleClickGeek = this.handleClickGeek.bind(this);
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

  handleFormSubmit(event) {
    event.preventDefault();
    let key = "my api key"
    $.ajax({
      url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.state.search}&countryCode=US&startDateTime=${this.state.date}T00:00:00Z&apikey=${key}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ ticket: data._embedded.events });
    });

    event.preventDefault();
    $.ajax({
      url: `https://api.seatgeek.com/2/events?q=${this.state.search}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeek: data.events });
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
        seatGeekEvent={this.state.seatGeekEvents}
        handleClickGeek={clickTarget}
        />
      );
    });
    let ticketdatas = this.state.ticket.map(ticketdata => {
      return (
        <Ticketdata
        key={ticketdata.id}
        id={ticketdata.id}
        url={ticketdata.url}
        name={ticketdata.name}
        />
      );
    });
    return (
      <div>
        Your Ticket: {ticketdatas}
        Your Geek: {seatGeekDatas}
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
    );
  }
}

export default Ticket;
