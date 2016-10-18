import React from 'react';

const BandsInTownData = props => {
  let clickedLineItem
  if (props.bandsInTownEvent.length !== 0 && props.bandsInTownEvent[0].id === props.id){
    clickedLineItem = <ul>
        <li><a href={props.bandsInTownEvent[0].ticket_url} target="_blank">Visit Bandsintown to See Tickets for This Event</a></li>
        <li>Venue: {props.venue}, {props.city}</li>
        <li><img src={props.bandsInTownEvent[0].artists[0].thumb_url}/></li>
        <li>Artists Website: <a href={props.bandsInTownEvent[0].artists[0].website} target="_blank">{props.bandsInTownEvent[0].artists[0].website}</a></li>
        <li>Pricing not available for this website</li>
      </ul>
  }else {
    clickedLineItem = null;
  }

  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickBand} className='data'>
    Event: {props.title}, City: {props.city} Date: {props.formatedDate}
    {clickedLineItem}
    </ul>
  </div>
  );
};

export default BandsInTownData;
