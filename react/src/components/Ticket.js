import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ticketdata from './Ticketdata';
import TicketForm from './TicketForm';
import SeatGeekData from './SeatGeekData';
import BandsInTownData from './BandsInTownData';
import RecommendedData from './RecommendedData';
import ClickedGeekData from './ClickedGeekData';
import ClickedTicketMasterData from './ClickedTicketMasterData';
import ClickedBandsInTownData from './ClickedBandsInTownData';
import ClickedRecommendedData from './ClickedRecommendedData';

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
      ticketMasterEvent: [],
      bandsInTownEvent: [],
      recommendedEvent: [],
      clickedEvent: '',
      message: '',
      search: '',
      date: '',
      endDate: '',
      zip: ''
     };
     this.handleFormSubmit = this.handleFormSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
     this.handleEndDateChange = this.handleEndDateChange.bind(this);
     this.handleZipChange = this.handleZipChange.bind(this);
     this.handleClickGeek = this.handleClickGeek.bind(this);
     this.handleClickTicketMaster = this.handleClickTicketMaster.bind(this);
     this.handleClickBand = this.handleClickBand.bind(this);
     this.handleButtonClick = this.handleButtonClick.bind(this);
     this.handleButtonClickTicket = this.handleButtonClickTicket.bind(this);
     this.handleButtonClickBand = this.handleButtonClickBand.bind(this);

  }
  handleButtonClick(event) {
    debugger;
    $.ajax({
      type: "POST",
      url: '/api/tickets',
      data: { ticket: { event_id: event, site: 'seatGeek' } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ message: data.message })
    });
    console.log(event);
  }

  handleButtonClickTicket(event) {
    debugger;
    $.ajax({
      type: "POST",
      url: '/api/tickets',
      data: { ticket: { event_id: event, site: 'ticketmaster' } },
      dataType: 'json',
    })
    .done(data => {
      this.setState({ message: data.message })
    });
  }

  handleButtonClickBand(event) {
    debugger;
    $.ajax({
      type: "POST",
      url: '/api/tickets',
      data: { ticket: { date: event, site: 'bandsInTown', keyword: this.state.search } },
      dataType: 'json',
    })
    .done(data => {
      this.setState({ message: data.message })
    });
  }



  handleClickGeek(event) {
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeekEvents: [data] });
    });
  }

  handleClickRecommended(event) {
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      console.log("clicked")
      this.setState({ recommendedEvent: [data] });
    });
  }

  handleClickBand(event) {
    $.ajax({
      url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid&date=${event}`,
      dataType: 'jsonp'
    })
    .done(data => {
      this.setState({ bandsInTownEvent: data });
    });
  }


  handleClickTicketMaster(event) {
    $.ajax({
      url: '/api/events',
      data: { ticket: { event_id: event, site: 'ticketmasterEvent' } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ ticketMasterEvent: [data.ticketmasterEvent] });
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: `https://api.seatgeek.com/2/events?q=${this.state.search}&datetime_utc.gte=#{this.state.date}&datetime_utc.lte=#{this.state.endDate}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeek: data.events });
      $.ajax({
        url: '/api/events',
        data: { ticket: {performer_id: data.events[0].performers[0].id, site: 'recommended', zip: this.state.zip } },
        dataType: 'json'
      })
      .done(data => {
        this.setState({ recommended: data.recommendedEvents.recommendations });
      });

    });

    event.preventDefault();
    $.ajax({
      url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid&${this.state.date},{this.state.endDate}`,
      dataType: 'jsonp'
    })
    .done(data => {
      this.setState({ bandsInTown: data });
    });

    event.preventDefault();
    $.ajax({
      url: '/api/events',
      data: { ticket: { keyword: this.state.search, site: 'ticketmaster', date: this.state.date, end_date: this.state.endDate, zip: this.state.zip } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ ticket: data.ticketmasterData._embedded.events });
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

  handleEndDateChange(event) {
    let newEndDate = event.target.value;
    this.setState({ endDate: newEndDate });
  }

  handleZipChange(event) {
    let newZip = event.target.value;
    this.setState({ zip: newZip });
  }

  render() {
    let clickedRecommendedDatas = this.state.recommendedEvent.map(clickedRecommendedDatas => {
      let handleClick = () => this.handleButtonClick(clickedRecommendedDatas.id)
      return (
        <ClickedRecommendedData
        key={clickedRecommendedDatas.id}
        id={clickedRecommendedDatas.id}
        title={clickedRecommendedDatas.title}
        venue={clickedRecommendedDatas.venue.name}
        date={clickedRecommendedDatas.datetime_local.slice(0,10)}
        city={clickedRecommendedDatas.venue.city}
        url={clickedRecommendedDatas.url}
        image={clickedRecommendedDatas.performers[0].image}
        display_location={clickedRecommendedDatas.venue.display_location}
        highest_price={clickedRecommendedDatas.stats.highest_price}
        lowest_price={clickedRecommendedDatas.stats.lowest_price}
        handleClick={handleClick}
        />
      );
    });

    let clickedBandsInTownDatas = this.state.bandsInTownEvent.map(clickedBandsInTownData => {
      let handleClick = () => this.handleButtonClickBand(clickedBandsInTownData.datetime.slice(0,10))
      return (
        <ClickedBandsInTownData
        key={clickedBandsInTownData.id}
        title={clickedBandsInTownData.id}
        ticket_status={clickedBandsInTownData.ticket_status}
        artist_website={clickedBandsInTownData.artists[0].website}
        image={clickedBandsInTownData.artists[0].image_url}
        date={clickedBandsInTownData.formatted_datetime}
        venue={clickedBandsInTownData.venue.name}
        handleClick={handleClick}
        />
      );
    });

    let clickedTicketMasterDatas = this.state.ticketMasterEvent.map(clickedTicketMasterData => {
      let handleClick = () => this.handleButtonClickTicket(clickedTicketMasterData.id)
      return (
        <ClickedTicketMasterData
        key={clickedTicketMasterData.id}
        id={clickedTicketMasterData.id}
        title={clickedTicketMasterData.name}
        venue={clickedTicketMasterData._embedded.venues[0].name}
        date={clickedTicketMasterData.dates.start.localDate}
        city={clickedTicketMasterData._embedded.venues[0].city.name}
        url={clickedTicketMasterData.url}
        image={clickedTicketMasterData.images[0].url}
        highest_price={clickedTicketMasterData.priceRanges.max}
        lowest_price={clickedTicketMasterData.priceRanges.min}
        handleClick={handleClick}
        />
      );
    });

      let clickedGeekDatas = this.state.seatGeekEvents.map(clickedGeekData => {
        let handleClick = () => this.handleButtonClick(clickedGeekData.id)
        return (
          <ClickedGeekData
          key={clickedGeekData.id}
          id={clickedGeekData.id}
          title={clickedGeekData.title}
          venue={clickedGeekData.venue.name}
          date={clickedGeekData.datetime_local.slice(0,10)}
          city={clickedGeekData.venue.city}
          url={clickedGeekData.url}
          image={clickedGeekData.performers[0].image}
          display_location={clickedGeekData.venue.display_location}
          highest_price={clickedGeekData.stats.highest_price}
          lowest_price={clickedGeekData.stats.lowest_price}
          handleClick={handleClick}
          />
        );
      });

    let recommendedDatas = this.state.recommended.map(recommendedData => {
      let clickTargetRecommended = () => this.handleClickRecommended(recommendedData.event.id)
      return (
        <RecommendedData
        key={recommendedData.event.id}
        id={recommendedData.event.id}
        title={recommendedData.event.title}
        venue={recommendedData.event.venue.name}
        date={recommendedData.event.datetime_local.slice(0,10)}
        city={recommendedData.event.venue.city}
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
        date={seatGeekData.datetime_local.slice(0,10)}
        venue={seatGeekData.venue.name}
        city={seatGeekData.venue.city}
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
        handleClickTicketMaster={clickMasterTarget}
        />
      );
    });
    return (
      <div className='jumbotron'>
        <div className='container'>
        <div className='messages'>{this.state.message}</div>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <TicketForm
              handleFormSubmit={this.handleFormSubmit}
              handleChange={this.handleChange}
              handleDateChange={this.handleDateChange}
              handleEndDateChange={this.handleEndDateChange}
              handleZipChange={this.handleZipChange}
              search={this.state.search}
              date={this.state.date}
              endDate={this.state.endDate}
              zip={this.state.zip}
              />
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 saved-events'>
          <h4>Saved Event Bucket</h4>
          <div id='main-div'>
            {clickedGeekDatas}
            {clickedTicketMasterDatas}
            {clickedBandsInTownDatas}
            {clickedRecommendedDatas}
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
              <div id='seatGeek'>
                SeatGeek: {seatGeekDatas}
              </div>
              <div id='bandsInTown'>
              Bandsintown: {bandsInTownDatas}
              </div>
              <div id='ticketmaster'>
                Ticketmaster: {ticketdatas}
              </div>
              <div id='recommended'>
                Recommnended Events: {recommendedDatas}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
