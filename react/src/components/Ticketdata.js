import React from 'react';

const Ticketdata = props => {
  let clickedLineItem;
  let min;
  let max;

  if (props.tickeMasterEvent.length !== 0 && props.tickeMasterEvent.ticketmasterEvent.id === props.id){
    if(props.tickeMasterEvent.ticketmasterEvent.priceRanges === undefined){
      min = 'Price not available';
      max = 'Price not available';
    }else {
      min = `Min Price: $${props.tickeMasterEvent.ticketmasterEvent.priceRanges[0].min}`;
      max = `Max Price: $${props.tickeMasterEvent.ticketmasterEvent.priceRanges[0].max}`;
    }
    clickedLineItem = <ul>
        <li>{props.name}</li>
        <li><a href={props.url} target="_blank">Visit Ticketmaster to See Tickets for This Event</a></li>
        <li><img src={props.tickeMasterEvent.ticketmasterEvent.images[0].url}/></li>
        <li>{props.tickeMasterEvent.ticketmasterEvent._embedded.venues[0].name}</li>
        <li>{props.tickeMasterEvent.ticketmasterEvent._embedded.venues[0].city.name}</li>
        <li>{max}</li>
        <li>{min}</li>
      </ul>

  }else {
    clickedLineItem = null;
  }
  return (
  <div>
    <ul onClick={props.handleClickTicketMaster}>
      {props.name}, Location: {props.venueName}, {props.city}, Date: {props.date}
      {clickedLineItem}
    </ul>
  </div>
  );
};

export default Ticketdata;
