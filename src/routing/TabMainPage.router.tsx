import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { THEME } from './../theme';

import { Context } from './../context/context';

// SCREENS
import SettingsScreen from './../screens/Settings.Screen';
import MainScreen from '../screens/Main.screen';




const Tab = createBottomTabNavigator();


export function MainTabs() {
  const {state} = useContext(Context)

  return (
    <Tab.Navigator tabBarOptions={
     { 
       activeTintColor: state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK,
       labelStyle: {fontSize: 14, fontWeight: 'bold'},
       activeBackgroundColor: state.isLightenMode ? 'lightgray' : 'white'       
     }
    } >
      <Tab.Screen 
        name="Main" 
        component={MainScreen}
        options={{                     
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={30} />
        )       
      }} />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}         
        options={{                     
          tabBarIcon: ({color}) => (        
           <AntDesign name="setting" size={30} color={color} />
          )                  
        }} />       
    </Tab.Navigator>
  );
};