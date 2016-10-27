import React from 'react';

const SearchHistory = props => {
  return (
  <ul className='saved-data'>
    <li>You searched for: {props.keyword} on {props.createdAt.slice(0,10)}</li>
    <li>With a start date of: {props.startDate}</li>
    <li>An end date of: {props.endDate}</li>
    <li>With a zip code of: {props.zip}</li>
  </ul>
  );
};

export default SearchHistory;
