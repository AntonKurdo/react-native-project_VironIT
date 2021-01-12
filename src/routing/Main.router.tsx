import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import HomeScreen from '../screens/Home.screen';
import SignUpScreen from '../screens/SignUp.screen';
import LoginScreen from './../screens/Login.screen';
import { MainTabs } from './TabMainPage.router';

const Stack = createStackNavigator();

const MainRouter : FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Log In" component={LoginScreen} />
                <Stack.Screen name="Main" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRouter;