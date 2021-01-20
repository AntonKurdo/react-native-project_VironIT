import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import * as AppContext from '../context/context';
import MainScreen from './../screens/Main.screen';

configure({adapter: new Adapter()});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    })
  };
});

describe('<MainScreen />' , () => {
  test('MainScreen render correctly', () => {    
  const contextValue = {state: {isLightenMode: true}};
  jest
    .spyOn(AppContext, 'useAppContext')
    .mockImplementation(() => contextValue);
  const wrapper = shallow(<MainScreen />);
  expect(wrapper).toMatchSnapshot();
  });
});