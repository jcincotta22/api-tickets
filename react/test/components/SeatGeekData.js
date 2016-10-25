
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
      key='1'
      id='1'
      title='Adele'
      date='2016-10-15'
      venue='The Garden'
      city='Boston'
      onClick={onClick}
      />
    );
  });

  it('should have props'), () => {
    expect(wrapper.find(SeatGeekData)).toHaveProp('key', '1');
    expect(wrapper.find(SeatGeekData)).toHaveProp('id', '1');
    expect(wrapper.find(SeatGeekData)).toHaveProp('title', 'Adele');
    expect(wrapper.find(SeatGeekData)).toHaveProp('date', '2016-10-15');
    expect(wrapper.find(SeatGeekData)).toHaveProp('venue', 'The Garden');
    expect(wrapper.find(SeatGeekData)).toHaveProp('city', 'Boston');
    expect(wrapper.find(SeatGeekData)).toHaveProp('onClick', {onClick});
  }

  it('should render an h5 tag', () => {
    let header = wrapper.find('h5');
  expect(header).toBePresent();
});

  it('should render an h5 tag with the text property value', () => {
    let header = wrapper.find('h5');
    expect(header.text()).toMatch('Adele');
  });

  it('should render an li tag', () => {
    let liItem = wrapper.find('li')
  expect(liItem.length).toEqual(2);
});

  it('should render an li tag with the text property value', () => {
    let firstLiItem = wrapper.find('li').at(0);
    expect(firstLiItem.text()).toMatch('Location: The Garden, Boston');
  });

  it('should render an li tag with the text property value', () => {
    let secondLineItem = wrapper.find('li').at(1);
    expect(secondLineItem.text()).toMatch('Date: 2016-10-15');
  });

  // it('should invoke the onClick function from props when clicked', () => {
  //   let header = wrapper.find('h5');
  //   debugger;
  //   expect(onClick).toNotHaveBeenCalled();
  //   header.simulate("click");
  //   expect(onClick).toHaveBeenCalled();
  //
  // });
});
