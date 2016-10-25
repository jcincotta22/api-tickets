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
import SavedEventsData from './SavedEventsData';
import SearchHistory from './SearchHistory'

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
      savedEvents:[],
      clickedEvent: '',
      message: '',
      search: '',
      date: '',
      endDate: '',
      zip: '',
      clickedEvent: '',
      searchHistory: []
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
     this.getSavedEvents = this.getSavedEvents.bind(this);
     this.formValidation = this.formValidation.bind(this);
     this.handleDelete = this.handleDelete.bind(this);
     this.getSearchHistory = this.getSearchHistory.bind(this);
     this.handleClickSearch = this.handleClickSearch.bind(this);
     this.handleDeleteSearch = this.handleDeleteSearch.bind(this);

  }



  formValidation() {
    let regex = /^(?:\d{5})$/;
    let inpObj = document.getElementById("zip");
    if ( regex.test(inpObj.value) ) {
      document.getElementById("formMessage").innerHTML = null;
      return true;
    }else {
      document.getElementById("formMessage").innerHTML = 'Zip must be 5 digits';
      return false;
    }
  }

  getSavedEvents() {
    $.ajax({
      url: '/api/saved_events',
      dataType: 'json'
    })
    .done(data => {
      this.setState({ savedEvents: data.savedEvents });
    });
  }

  getSearchHistory() {
    $.ajax({
      url: '/api/search_histories',
      dataType: 'json'
    })
    .done(data => {
      this.setState({ searchHistory: data.searchHistory });
      if(data.message !== '' ){
        this.setState({ message: <div className='messages'>{data.message}</div> })
      }
      this.setState({ clickedEvent: 'searchHistory' })
    });
  }

  handleClickSearch(){
    this.setState({ message: '' });
    this.getSearchHistory();
  }

  componentDidMount() {
    this.getSavedEvents();
  }

  handleButtonClick(event) {
    $.ajax({
      type: "POST",
      url: '/api/saved_events',
      data: { saved_event: { event_id: event.id, site: 'seatGeek', title: event.title, url: event.url } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ message: <div className='messages'>{data.message}</div> })
      this.getSavedEvents();
      $(window).scrollTop(0);
    });
  }

  handleButtonClickTicket(event) {
    $.ajax({
      type: "POST",
      url: '/api/saved_events',
      data: { saved_event: { event_id: event.id, site: 'ticketmaster', title: event.name, url: event.url } },
      dataType: 'json',
    })
    .done(data => {
      this.setState({ message: <div className='messages'>{data.message}</div> })
      this.getSavedEvents();
      $(window).scrollTop(0);
    });
  }

  handleButtonClickBand(event) {
    $.ajax({
      type: "POST",
      url: '/api/saved_events',
      data: { saved_event: { date: event.datetime.slice(0,10), site: 'bandsInTown', keyword: this.state.search, title: event.title, url: event.ticket_url } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ message: <div className='messages'>{data.message}</div> })
      this.getSavedEvents();
      $(window).scrollTop(0);
    });
  }

  handleDelete(event) {
    $.ajax({
      type: "DELETE",
      url: `/api/saved_events/${event}`,
      dataType: 'json',
      data: { saved_event: { id: event } }
    })
    .done(data => {
      this.setState({ message: <div className='messages'>{data.message}</div> })
      this.getSavedEvents();
    });
  }

  handleDeleteSearch() {
    $.ajax({
      type: "DELETE",
      url: `/api/delete_all`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ message: <div className='messages'>{data.message}</div> })
      this.getSearchHistory();
    });
  }


  handleClickGeek(event) {
    this.setState({ message: '' });
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ seatGeekEvents: [data] });
      this.setState({ clickedEvent: 'seatGeek' })
      $('html, body').animate({
        scrollTop: $("#clickGeek").offset().top - 200}, 1000);
    });
  }

  handleClickRecommended(event) {
    this.setState({ message: '' });
    $.ajax({
      url: `https://api.seatgeek.com/2/events/${event}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({ recommendedEvent: [data] });
      this.setState({ clickedEvent: 'recommended' })
      $('html, body').animate({
          scrollTop: $("#clickRec").offset().top - 200
      }, 1000) ;
    });
  }

  handleClickBand(event) {
    this.setState({ message: '' });
    $.ajax({
      url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid&date=${event}`,
      dataType: 'jsonp'
    })
    .done(data => {
      this.setState({ bandsInTownEvent: data });
      this.setState({ clickedEvent: 'bandsInTown' })
      $('html, body').animate({
          scrollTop: $("#clickBand").offset().top - 200
      }, 1000) ;
    });
  }


  handleClickTicketMaster(event) {
    this.setState({ message: '' });
    $.ajax({
      url: '/api/events',
      data: { ticket: { event_id: event, site: 'ticketmasterEvent' } },
      dataType: 'json'
    })
    .done(data => {
      this.setState({ ticketMasterEvent: [data.ticketmasterEvent] });
      this.setState({ clickedEvent: 'ticketMaster' })
      $('html, body').animate({
          scrollTop: $("#clickTicket").offset().top - 200
      }, 1000) ;
    });
  }

  handleFormSubmit(event) {
    let formValidity
    event.preventDefault();

    this.setState({ message: '' });
    formValidity = this.formValidation();
    if (formValidity === true) {

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

      $.ajax({
        url: `http://api.bandsintown.com/artists/${this.state.search}/events.json?api_version=2.0&app_id=myid&${this.state.date},{this.state.endDate}`,
        dataType: 'jsonp'
      })
      .done(data => {
        this.setState({ bandsInTown: data });
      });

      $.ajax({
        url: '/api/events',
        data: { ticket: { keyword: this.state.search, site: 'ticketmaster', date: this.state.date, end_date: this.state.endDate, zip: this.state.zip } },
        dataType: 'json'
      })
      .done(data => {
        if(data.ticketmasterData._embedded !== undefined){
          this.setState({ ticket: data.ticketmasterData._embedded.events });
        }
      });
    }
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

    let clickedSearchHistoriesDatas = this.state.searchHistory.map(clickedSearchHistoriesData => {
        return (
          <SearchHistory
          key={clickedSearchHistoriesData.id}
          id={clickedSearchHistoriesData.id}
          site={clickedSearchHistoriesData.site}
          keyword={clickedSearchHistoriesData.keyword}
          startDate={clickedSearchHistoriesData.date}
          endDate={clickedSearchHistoriesData.end_date}
          zip={clickedSearchHistoriesData.zip}
          createdAt={clickedSearchHistoriesData.created_at}
          />
      );
    });

    let clickedRecommendedDatas = this.state.recommendedEvent.map(clickedRecommendedDatas => {
      let handleClick = () => this.handleButtonClick(clickedRecommendedDatas)
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
      let handleClick = () => this.handleButtonClickBand(clickedBandsInTownData)
      return (
        <ClickedBandsInTownData
        key={clickedBandsInTownData.id}
        id={clickedBandsInTownData.id}
        title={clickedBandsInTownData.title}
        url={clickedBandsInTownData.ticket_url}
        location={clickedBandsInTownData.venue.city}
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
      let handleClick = () => this.handleButtonClickTicket(clickedTicketMasterData)
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
        highest_price={clickedTicketMasterData.priceRanges[0].max}
        lowest_price={clickedTicketMasterData.priceRanges[0].min}
        handleClick={handleClick}
        />
      );
    });

      let clickedGeekDatas = this.state.seatGeekEvents.map(clickedGeekData => {
        let handleClick = () => this.handleButtonClick(clickedGeekData)
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
      let recommendedDatas
      if (this.state.recommended.length !== 0) {
        recommendedDatas = this.state.recommended.map(recommendedData => {
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
    }else {
      recommendedDatas = '';
    }
      let bandsInTownDatas
    if((this.state.bandsInTown.length !== 0) && (this.state.bandsInTown.errors === undefined)) {
      bandsInTownDatas = this.state.bandsInTown.map(bandsInTownData => {
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
    }else {
      bandsInTownDatas = '';
    }
    let seatGeekDatas
    if(this.state.seatGeek.length !== 0) {

      seatGeekDatas = this.state.seatGeek.map(seatGeekData => {
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
    }else {
      seatGeekDatas = '';
    }
    let ticketdatas
      if(this.state.ticket.length !== 0) {
        ticketdatas = this.state.ticket.map(ticketdata => {
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
      }else{
        ticketdatas = '';
      }
    let savedEventsDatas
    if (this.state.savedEvents.length === 0){
      savedEventsDatas = null
    }else{
      savedEventsDatas = this.state.savedEvents.map(savedEventsData => {
        let handleClick = () => this.handleDelete(savedEventsData.id)
        return (
          <SavedEventsData
          key={savedEventsData.id}
          title={savedEventsData.title}
          site={savedEventsData.site}
          url={savedEventsData.url}
          handleClick={handleClick}
          />
        );
      });

    }
    let clickedOutput
    if(this.state.clickedEvent === 'seatGeek'){
      clickedOutput = <div className="clicked col-lg-12 col-md-12 col-sm-12 col-xs-12" id='clickGeek'>{clickedGeekDatas}</div>
    }else if (this.state.clickedEvent === 'ticketMaster'){
      clickedOutput = <div className="clicked col-lg-12 col-md-12 col-sm-12 col-xs-12" id='clickTicket'>{clickedTicketMasterDatas}</div>
    }else if (this.state.clickedEvent === 'bandsInTown'){
      clickedOutput = <div className="clicked col-lg-12 col-md-12 col-sm-12 col-xs-12" id='clickBand'>{clickedBandsInTownDatas}</div>
    }else if (this.state.clickedEvent === 'recommended'){
      clickedOutput = <div className="clicked col-lg-12 col-md-12 col-sm-12 col-xs-12" id='clickRec'>{clickedRecommendedDatas}</div>
    }else if (this.state.clickedEvent === 'searchHistory'){
      clickedOutput = <div className="clicked col-lg-12 col-md-12 col-sm-12 col-xs-12"><a href="#" onClick={this.handleDeleteSearch} className='link'>Clear History</a>{clickedSearchHistoriesDatas}
      </div>
    }else{
      clickedOutput = null;
    }
    return (
      <div className='jumbotron'>
        <div className='message-container'>
          <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                {this.state.message}
              </div>
            </div>
          </div>
        <div className='container'>
          <div className='row form-div'>
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
        <div className='container'>
          <div className='row'>

            <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
              <div className="panel panel-info">
                <div className="panel-heading"><img src="https://upload.wikimedia.org/wikipedia/en/1/1b/SeatGeek.png" className="heading-img"/></div>
                <div id='seatGeek' className='results'>
                  {seatGeekDatas}
                </div>
              </div>
              <div className="panel panel-info">
                <div className="panel-heading"><img src="http://bespokemusicgroup.com/img/tools/bandsintown.png" className="heading-img"/></div>
                <div id='bandsInTown' className='results'>
                  {bandsInTownDatas}
                </div>
              </div>
              <div className="panel panel-info">
                <div className="panel-heading"><img src="http://b2b.ticketmaster.nl/sites/default/files/downloads/tmlogo_grey.png" className="heading-img"/></div>
                <div id='ticketmaster' className='results'>
                  {ticketdatas}
                </div>
              </div>
              <div className="panel panel-info">
                <div className="panel-heading"><h4>Recommended By Us</h4></div>
                <div id='recommended' className='results'>
                  {recommendedDatas}
                </div>
              </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='container'>
                <div id='main-div row'>
                  {clickedOutput}
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
              <a href="#" onClick={this.handleClickSearch} className='link'>Search History</a>
              <div className="panel panel-info">
                <div className="panel-heading"><h4>Saved Event Bucket</h4></div>
                <div className="panel-info">{savedEventsDatas}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
