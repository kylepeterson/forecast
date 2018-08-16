import React from 'react';
import WeatherApp from '../containers/WeatherApp';
import { render, shallow } from 'enzyme';

const EDINBURGH_MOCK = require('./mocks/edinburgh');

beforeEach(function() {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: '123',
        json: () => EDINBURGH_MOCK
      });
    });
  });

});

it('renders without crashing', () => {
  shallow(<WeatherApp />);
});

it('effectively parses weekly data into map of five days', () => {
  const wrapper = shallow(<WeatherApp />);
  setImmediate(() => {
    wrapper.update();
    expect(Object.keys(wrapper.state('dayToDetails')).length).toBe(5);
  });
});

it('sets loading to false after data is loaded', () => {
  const wrapper = shallow(<WeatherApp />);
  expect(wrapper.state('loading')).toBe(true);
  setImmediate(() => {
    wrapper.update();
    expect(wrapper.state('loading')).toBe(false);
  });
});
