import React from 'react';

const ClickedBandsInTownData = props => {
  debugger;
  let clickedLineItem
    clickedLineItem = <ul>
        <li>{props.title}</li>
        <li><a href={props.url} target="_blank">Visit SeatGeek to See Tickets for This Event</a></li>
        <li>{props.venue}</li>
        <li>{props.location}</li>
        <li>{props.date}</li>
        <li>Artist Webisite: ${props.artist_website}</li>
        <li>Ticket Status: ${props.ticket_status}</li>
        <li><img src={props.image}/></li>
      </ul>


  return (
    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 saved-events'>
      {clickedLineItem}
    </div>
  );
};

export default ClickedBandsInTownData;
