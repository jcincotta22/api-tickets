import React from 'react';

const BandsInTownData = props => {
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickBand} className='data'>
      <li>{props.title}</li>
      <li>Location: {props.venue}, {props.city}</li>
      <li>Date: {props.formatedDate}</li> 
    </ul>
  </div>
  );
};

export default BandsInTownData;
