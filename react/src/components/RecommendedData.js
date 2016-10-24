import React from 'react';

const RecommendedData = props => {
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickRecommended} className='data'>
      <li>{props.title}</li>
      <li>Location: {props.venue}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default RecommendedData;
