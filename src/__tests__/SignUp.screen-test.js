import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import * as AppContext from '../context/context';
import SignUpScreen from './../screens/SignUp.screen';

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

describe('<SignUpScreen />' , () => {
  test('SignUpScreen render correctly', () => {    
  const contextValue = {state: {isLightenMode: true}};
  jest
    .spyOn(AppContext, 'useAppContext')
    .mockImplementation(() => contextValue);
  const wrapper = shallow(<SignUpScreen />);
  expect(wrapper).toMatchSnapshot();
  });
});