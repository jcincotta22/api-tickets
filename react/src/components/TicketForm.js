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
      <input type="submit" value="Search Event"/>
    </form>
  </div>
  );
};

export default TicketForm;
