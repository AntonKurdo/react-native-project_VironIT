import React, { FC, useContext } from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import { THEME } from './../theme';
import { Context } from './../context/context';

export const AppLoader: FC = () => {
  const {state} = useContext(Context);
  
  return (
    <View style={styles.container}>   
      <ActivityIndicator size='large' color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} /> 
    </View>    
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

