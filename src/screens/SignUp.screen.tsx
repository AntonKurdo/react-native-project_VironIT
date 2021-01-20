import React, { FC, useState } from 'react';
import {StyleSheet, Text, View, TextInput } from 'react-native';
import { THEME } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../services/asyncStorage.service';
import { AppButton } from '../components/AppButton';
import { useAppContext } from './../context/context';


const SignUpScreen : FC = () => {

  const {state} = useAppContext();   

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation();
  const onSignUp = async (): Promise<void> => {
    if(await storeData({login, password})) {
      navigation.navigate('Log In');
      setLogin('');
      setPassword('');
    }        
  };
  
  return (
    <View style={state.isLightenMode ? {...styles.wrapper, ...styles.wrapperLight} : {...styles.wrapper, ...styles.wrapperDark}}>
      <View style={{marginBottom: 30}}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput 
          placeholder='Enter Your E-mail...'
          placeholderTextColor={THEME.SECOND_COLOR_LIGHT} 
          style={styles.input} 
          selectionColor={THEME.SECOND_COLOR_LIGHT}
          value={login}              
          onChangeText={login => setLogin(login.trim())}         
        />
      </View>
      <View>
        <Text style={styles.text}> Password </Text>
        <TextInput 
          placeholder='Enter Your password...'
          placeholderTextColor={THEME.SECOND_COLOR_LIGHT}
          style={styles.input} 
          selectionColor={THEME.SECOND_COLOR_LIGHT}         
          value={password}              
          onChangeText={setPassword}     
          secureTextEntry={true}     
        />
      </View>
      <AppButton
              onPress={() => onSignUp()}
              iconName='pencil'
              iconSize={27}
              variant="V2"
              style={{marginTop: 30, width: 155, height: 55}}
            >Sign Up</AppButton>      
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    height: THEME.HEIGHT 
   },
   wrapperLight: {
    backgroundColor: THEME.MAIN_COLOR_LIGHT,
   },
   wrapperDark: {
    backgroundColor: THEME.MAIN_COLOR_DARK,
   },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: THEME.SECOND_COLOR_LIGHT,
    alignSelf: 'center',
    marginLeft: 10
  },
  input: {
    borderBottomColor: THEME.SECOND_COLOR_LIGHT,
    borderBottomWidth: 2,
    width: THEME.WIDTH * 0.7,
    color: THEME.SECOND_COLOR_LIGHT,
    fontSize: 18,
    padding: 4
  },
  button: {
    flexDirection: 'row',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: THEME.SECOND_COLOR_LIGHT,
    borderRadius: THEME.BORDER_RADIUS,
    marginTop: 30
  }
});

export default SignUpScreen;