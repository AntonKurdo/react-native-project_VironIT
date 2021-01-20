import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppLoader } from './../components/AppLoader';
import * as AppContext from '../context/context';

configure({adapter: new Adapter()});

describe('<AppLoader />' , () => {
  test('AppLoader render correctly', () => {    
  const contextValue = {state: {isLightenMode: false}};
  jest
    .spyOn(AppContext, 'useAppContext')
    .mockImplementation(() => contextValue);

  const wrapper = shallow(<AppLoader />);
  expect(wrapper).toMatchSnapshot();
  });
});