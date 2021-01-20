import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppButton } from './../components/AppButton';
import * as AppContext from '../context/context';

configure({adapter: new Adapter()});

describe('<AppButton />' , () => {
  test('AppButton render correctly', () => {    
  const contextValue = {state: {isLightenMode: false}};
  jest
    .spyOn(AppContext, 'useAppContext')
    .mockImplementation(() => contextValue);
  const wrapper = shallow(<AppButton />);
  expect(wrapper).toMatchSnapshot();
  });
});