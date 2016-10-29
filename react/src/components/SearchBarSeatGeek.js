
import React from 'react';

const SearchBarSeatGeek = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Filter Results"
      value={props.searchTermSg}
      onChange={props.handleSearchChangeSg}
      />
  );
};

export default SearchBarSeatGeek;
