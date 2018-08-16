import React from 'react';
import WeatherSnippet from '../components/WeatherSnippet';
import { shallow } from 'enzyme';

it('renders metric units when metric is true', () => {
  const wrapper = shallow(<WeatherSnippet high={30} low={20} metric />);
  const metric = (
      <div className="weather-snippet__temps__high">
        {`30\u2103`}
      </div>
  );
  expect(wrapper).toContainReact(metric);
});

it('renders imperial units when metric is false', () => {
  const wrapper = shallow(<WeatherSnippet high={30} low={20} metric={false} />);
  const imperial = (
      <div className="weather-snippet__temps__high">
        {`30\u2109`}
      </div>
  );
  expect(wrapper).toContainReact(imperial);
});

it('correctly rounds temperatures', () => {
  const wrapper = shallow(<WeatherSnippet high={30.49} low={20.5} />);
  const high = (
      <div className="weather-snippet__temps__high">
        {`30\u2103`}
      </div>
  );
  const low = (
      <div className="weather-snippet__temps__low">
        {`21\u2103`}
      </div>
  );
  expect(wrapper).toContainReact(high);
  expect(wrapper).toContainReact(low);
});
