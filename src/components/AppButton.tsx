import React, {FC, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from './../theme';
import { Context } from './../context/context';


interface StylesType {
  [key: string]: string | number
};

type VariantType = 'V1' | 'V2';

type AppButtonProps = {
    children: any, 
    onPress: () => void,     
    iconName: any,
    iconSize?: number, 
    style?: StylesType,
    variant?: VariantType
};

export const AppButton : FC <AppButtonProps> = ({onPress, children, iconName, iconSize = 24,  style = {}, variant = 'V1'}) => {
    const {state} = useContext(Context);

    return (
      <TouchableOpacity style={variant === 'V1' ? state.isLightenMode ? {...styles.button, ...styles.buttonLightV1, ...style} : {...styles.button, ...styles.buttonDarkV1, ...style} : state.isLightenMode ? {...styles.button, ...styles.buttonLightV2, ...style} : {...styles.button, ...styles.buttonDarkV2, ...style}} onPress={onPress}>              
         <FontAwesome name={iconName} size={iconSize} color={variant === 'V1' ? state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK : state.isLightenMode ? THEME.SECOND_COLOR_LIGHT : THEME.SECOND_COLOR_LIGHT } />
         <Text style={variant === 'V1' ? state.isLightenMode ? {...styles.text, ...styles.textLightV1} : {...styles.text, ...styles.textDarkV1} : state.isLightenMode ? {...styles.text, ...styles.textLightV2} : {...styles.text, ...styles.textDarkV2}}>{children}</Text>
      </TouchableOpacity>        
    )
};

const styles = StyleSheet.create({
  button: {  
    flexDirection: 'row',
    width: THEME.WIDTH / 3,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 5,
    alignItems: 'center',
    borderWidth: 2,   
    borderRadius:  THEME.BORDER_RADIUS
  },
  buttonLightV1: {
    borderColor: THEME.MAIN_COLOR_LIGHT,
  },
  buttonDarkV1: {
    borderColor: THEME.MAIN_COLOR_DARK,   
  },
  buttonLightV2: {
    borderColor: THEME.SECOND_COLOR_LIGHT,
  },
  buttonDarkV2: {
    borderColor: THEME.SECOND_COLOR_LIGHT,   
  },
  text: {   
    marginLeft: 7,
    fontSize: 22,    
    fontWeight: 'bold'
  },
  textLightV1: {
    color: THEME.MAIN_COLOR_LIGHT,
  },
  textDarkV1: {
    color: THEME.MAIN_COLOR_DARK,  
  },
  textLightV2: {
    color: THEME.SECOND_COLOR_LIGHT,
  },
  textDarkV2: {
    color: THEME.SECOND_COLOR_LIGHT,  
  }
})