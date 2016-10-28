
import React from 'react';

const SearchBarSeatGeek = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Keyword Search"
      value={props.searchTermSg}
      onChange={props.handleSearchChangeSg}
      />
  );
};

export default SearchBarSeatGeek;
