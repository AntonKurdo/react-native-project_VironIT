import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import * as AppContext from '../context/context';
import { ShopsListItem } from './../components/ShopsListItem';

configure({adapter: new Adapter()});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('<ShopsListItem />' , () => {
  test('ShopsListItem render correctly', () => {    
  const contextValue = {state: {isLightenMode: false}};
  jest
    .spyOn(AppContext, 'useAppContext')
    .mockImplementation(() => contextValue);
  const wrapper = shallow(<ShopsListItem item={{id: '1'}} />);
  expect(wrapper).toMatchSnapshot();
  });
});