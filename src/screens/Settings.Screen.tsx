import React, {FC, useContext} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import { THEME } from './../theme';
import { Context } from './../context/context';

const SettingsScreen: FC = () => {

  const {state, changeTheme} = useContext(Context);  

  return (
    <View style={state.isLightenMode ?  styles.containerLight : styles.containerDark}> 
      <Text style={styles.text}>Theme mode</Text>   
      <Switch  
        style={{...styles.switch, ...{ transform: [{ scaleX: 2 }, { scaleY: 2 }]}}}      
        trackColor={{ false: 'gray', true: "gray" }}
        thumbColor={state.isLightenMode ? 'black' : "white"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {         
          changeTheme();
        }}
        value={state.isLightenMode}             
      />
      <Text style={{fontSize: 12}}>Now You are in:</Text>
      <Text style={state.isLightenMode ? {...styles.location, ...styles.locationLight} : {...styles.location, ...styles.locationDark}}>{state.location}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.SECOND_COLOR_LIGHT
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
  switch: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  text: {
    position: 'absolute',
    top: 23,
    right: 100,
    fontSize: 16,
    color: 'gray',
    textTransform: 'uppercase'    
  },
  location: {
    fontSize: 30,
    fontWeight: 'bold'    
  },
  locationLight:  {
    color: THEME.MAIN_COLOR_LIGHT
  },
  locationDark:  {
    color: THEME.MAIN_COLOR_DARK
  }
})

export default SettingsScreen;