import React from 'react';

const TicketForm = props => {
  return (
  <div>
    <form onSubmit={props.handleFormSubmit}>
      <input
        type="text"
        placeholder="Keyword"
        value={props.search}
        onChange={props.handleChange}
      />
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        value={props.date}
        onChange={props.handleDateChange}
      />
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        value={props.endDate}
        onChange={props.handleEndDateChange}
      />
      <input
        type="text"
        placeholder="Zip"
        value={props.zip}
        onChange={props.handleZipChange}
      />
    <input type="submit" className='btn btn-info' value="Search Event"/>
    </form>
  </div>
  );
};

export default TicketForm;
