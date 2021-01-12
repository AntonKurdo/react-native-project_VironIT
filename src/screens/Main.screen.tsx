import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import { AppButton } from '../components/AppButton';
import { Context } from './../context/context';
import { THEME } from './../theme';
import { useNavigation } from '@react-navigation/native';
import { MapModal } from '../components/MapModal/MapModal';

const MainScreen: FC = () => {

  const {state, setMapModal, clearActiveUser, clearShops, hideLoader} = useContext(Context);
  const navigation = useNavigation();

  useEffect(() =>  {
    setTimeout(() => {
      hideLoader();
    }, 200)
  }, []);

  return (
    <View style={state.isLightenMode ? {...styles.container, ...styles.containerLight} :  {...styles.container, ...styles.containerDark}}> 
      <MapModal />
      <AppButton 
        onPress={setMapModal}         
        iconName='map-marker'  
        style={{marginBottom: 15}}
      >Map</AppButton>   
      <AppButton 
        onPress={() => {
          clearActiveUser();
          clearShops();
          navigation.navigate('Home');
        }}      
        iconName='sign-out'  
      >Log Out</AppButton>   
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerLight: {
    backgroundColor: THEME.SECOND_COLOR_LIGHT
  }, 
  containerDark: {
    backgroundColor: 'lightgray'
  }
});

export default MainScreen;