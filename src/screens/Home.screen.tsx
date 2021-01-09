import React, { FC, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { THEME } from '../theme';
import { Context } from './../context/context';
import { locale } from './../services/location.service';
import { getLocationName } from './../services/getLocationName.service';
import { AppButton } from '../components/AppButton';

const imageLight = require('../../assets/login-bg.png');
const imageBlack = require('../../assets/black-bg.png');

const HomeScreen : FC = () => { 

  const navigation = useNavigation();
  const {state, setLocation} = useContext(Context);

  const getLocation = useCallback(async () => {
    const data = await locale();
    const coords = {latitude: data.coords.latitude, longitude: data.coords.longitude};
    const locationName = await getLocationName(coords);
    setLocation(locationName, coords);
  }, [locale]);

  useEffect( () => {
    getLocation();
  }, []);

  return (
      <View style={state.isLightenMode ? styles.containerLight : styles.containerDark}>
         <ImageBackground source={state.isLightenMode ? imageLight : imageBlack} style={styles.image}>      
          <View style={styles.innerWrapper}>
            <AppButton
              onPress={() => navigation.navigate('Log In')}              
              iconName='sign-in'
              style={{marginBottom: 10}}
            >Log In</AppButton>           
            <AppButton
              onPress={() => navigation.navigate('Sign Up')}              
              iconName='pencil'
            >Sign Up</AppButton>              
          </View>
          <Text style={{alignSelf: 'center', fontSize: 11, color: 'gray'}}> © created by Anton Kurdo</Text>
         </ImageBackground>
      </View>
  )
};

const styles = StyleSheet.create({
  containerLight: {
      flex: 1, 
      justifyContent: 'flex-end',     
      backgroundColor: THEME.SECOND_COLOR_LIGHT
  },
  containerDark: {
    flex: 1, 
    justifyContent: 'flex-end',     
    backgroundColor: THEME.SECOND_COLOR_DARK
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",   
    height: THEME.HEIGHT * 0.55
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: THEME.WIDTH,  
    padding: 30,
    paddingBottom: 100
    
  },
  button: {  
    flexDirection: 'row',
    width: THEME.WIDTH / 3,
    height: 50,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    alignItems: 'center',
    borderWidth: 2,   
    borderRadius:  THEME.BORDER_RADIUS
  },
  buttonLight: {
    borderColor: THEME.MAIN_COLOR_LIGHT,
  },
  buttonDark: {
    borderColor: THEME.MAIN_COLOR_DARK,
  },
  text: {
    marginLeft: 7,
    fontSize: 22,    
    fontWeight: 'bold'
  },
  textLight: {
    color: THEME.MAIN_COLOR_LIGHT,
  },
  textDark: {
    color: THEME.MAIN_COLOR_DARK,
  }
});

export default HomeScreen;