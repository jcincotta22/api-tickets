import React from 'react';

const ClickedBandsInTownData = props => {
  let clickedLineItem
    clickedLineItem = <ul className='clicked-data'>
        <h2>{props.title}</h2>
        <li><img src={props.image} className="clicked-image"/></li>
        <li><a href={props.url} target="_blank">Visit BandsInTown to See Tickets for This Event</a></li>
        <li>{props.venue}</li>
        <li>{props.location}</li>
        <li>{props.date}</li>
        <li><a href={props.artist_website}>{props.artist_website}</a></li>
        <li>Ticket Status: {props.ticket_status}</li>
        <button type="button" className="btn btn-info" onClick={props.handleClick}>Save Event</button>
      </ul>


  return (
    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      {clickedLineItem}
    </div>
  );
};

export default ClickedBandsInTownData;
