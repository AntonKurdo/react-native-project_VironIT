import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { THEME } from './../theme';

import { useAppContext } from './../context/context';

// SCREENS
import SettingsScreen from './../screens/Settings.Screen';
import MainScreen from '../screens/Main.screen';
import CreateShopForm from './../screens/CreateShopForm.screen';
import ShopsList from './../screens/ShopsList.screen';





const Tab = createBottomTabNavigator();


export function MainTabs(){
  const {state} = useAppContext()

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
       }}       
      />
       <Tab.Screen 
        name="Form" 
        component={CreateShopForm}         
        options={{                     
          tabBarIcon: ({color}) => (        
           <AntDesign name="form" size={30} color={color} />
          )                  
        }} />    
        <Tab.Screen 
        name="ShopsList" 
        component={ShopsList}         
        options={{                     
          tabBarIcon: ({color}) => (        
           <FontAwesome name="list-alt" size={30} color={color} />
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