import React, { FC } from 'react';
import {StyleSheet, View, Text, Switch, TextInput} from 'react-native';
import { THEME } from './../theme';
import { useAppContext } from './../context/context';
import { sendNotification } from '../services/notifications.service';
import { getNearestShop } from './../services/geofence.service';

const SettingsScreen: FC = () => {

  const {state, coords, changeTheme, setRadius} = useAppContext();  
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
      <View style={styles.radiusCont}>
        <Text style={styles.radiusText}>Set radius</Text>
        <TextInput
          selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
          placeholder='Set radius'        
          keyboardType='numeric'
          value={state.radius.toString()}
          style={state.isLightenMode ? {...styles.radius, ...styles.radiusLight} : {...styles.radius, ...styles.radiusDark}} 
          onChangeText={async text => {
            const nearestShop = getNearestShop(state.shops, parseInt(text), coords);
            if(nearestShop) {
                await sendNotification(nearestShop.name, nearestShop.distance.toFixed(2))
            }          
            setRadius(text ? parseInt(text) : 0)
          }}
          maxLength={4}
        />
        <Text style={styles.radiusText}>M</Text>
      </View>
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
  },
  radius: {
    borderWidth: 2,
    padding: 5,
    width: THEME.WIDTH * 0.3,
    fontSize: 21,
    borderRadius: 10,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 5
  },
  radiusLight: {
    color: THEME.MAIN_COLOR_LIGHT,
    borderColor: THEME.MAIN_COLOR_LIGHT
  },
  radiusDark: {
    color: THEME.MAIN_COLOR_DARK,
    borderColor: THEME.MAIN_COLOR_DARK
  },
  radiusCont: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  radiusText: {
    fontSize: 20,
    color: 'gray'
  }
})

export default SettingsScreen;