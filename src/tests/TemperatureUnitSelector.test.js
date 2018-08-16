import React from 'react';
import TemperatureUnitSelector from '../components/TemperatureUnitSelector';
import { shallow } from 'enzyme';

it('highlights correct unit when selected', () => {
  let wrapper = shallow(<TemperatureUnitSelector metric />);
  expect(wrapper.find('.temperature-unit-selector__metric.temperature-unit-selector__selected'))
      .toExist();
  wrapper = shallow(<TemperatureUnitSelector metric={false} />);
  expect(wrapper.find('.temperature-unit-selector__imperial.temperature-unit-selector__selected'))
      .toExist();
});
