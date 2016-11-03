import React from 'react';

const SearchBarTicketmaster = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Filter Results"
      value={props.searchTerm}
      onChange={props.handleSearchChange}
      />
  );
};

export default SearchBarTicketmaster;
