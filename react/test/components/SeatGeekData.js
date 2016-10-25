
import SeatGeekData from 'components/SeatGeekData';
import { shallow } from 'enzyme';
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';

describe('SeatGeekData', () => {
  let ticketFrom,
      onClick,
      text,
      wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    onClick = jasmine.createSpy('onClick spy');
    wrapper = shallow(
      <SeatGeekData
      title='Adele'
      date='2016-10-15'
      venue='The Garden'
      city='Boston'
      onClick={onClick}
      />
    );
  });

  // it('should render an h5 tag', () => {
  //   expect(wrapper.find('h5').props()).toEqual({
  //     title: 'Adele',
  //     date: '2016-10-15',
  //     venue: 'The Garden',
  //     city: 'Boston'
  //   });
  // });

//   it('should render an h5 tag', () => {
//   expect(wrapper.find('h5')).toBePresent();
// });

  it('should render an h5 tag with the text property value', () => {
    expect(wrapper.find('h5').text()).toBe('Adele');
  });

  it('should render an li tag', () => {
  expect(wrapper.find('li').length).toEqual(2);
});

  // it('should render an li tag with the text property value', () => {
  //   expect(wrapper.find('li').text()).toBe('The Garden, Boston');
  // });

  // it('should render an li tag with the text property value', () => {
  //   expect(wrapper.find('li').text()).toBe('2016-10-15');
  // });

  // it('should invoke the onClick function from props when clicked', () => {
  //   wrapper.simulate('click');
  //   expect(onClick).toHaveBeenCalled();
  //
  // });
});
