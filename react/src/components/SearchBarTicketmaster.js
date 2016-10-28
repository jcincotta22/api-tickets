
import React from 'react';

const SearchBarTicketmaster = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Keyword Search"
      value={props.searchTerm}
      onChange={props.handleSearchChange}
      />
  );
};

export default SearchBarTicketmaster;
