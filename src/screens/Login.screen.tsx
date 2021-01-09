import React, {FC, useState, useContext} from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';

import { THEME } from '../theme';
import { getData } from './../services/asyncStorage.service';
import { useNavigation } from '@react-navigation/native';
import { Context } from './../context/context';
import { AppButton } from '../components/AppButton';
import { AppLoader } from '../components/AppLoader';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation();
  const {state, showLoader, hideLoader} = useContext(Context);

  const onLogin: () => Promise<void> = async () => {
    showLoader();
    try {
      const data = JSON.parse(await getData());
      const candidate = data.find(user => user.login === email);    
        if(candidate && candidate.password === password) {  
          setTimeout(() => {  
            navigation.navigate('Main');       
            hideLoader();                   
          }, 1500)          
        } else {
          hideLoader();
          Alert.alert('Log In Error!!!', 'Check entered data...')
        }        
    } catch(e) {
      console.log(e);
    } 
  }; 


  if(state.isLoader) {
    return <AppLoader />
  };

  return (
    <View style={state.isLightenMode ? {...styles.wrapper, ...styles.wrapperLight } : {...styles.wrapper, ...styles.wrapperDark }}>
    <View style={{marginBottom: 30}}>
      <Text style={state.isLightenMode ? {...styles.text, ...styles.textLight} : {...styles.text, ...styles.textDark}}>E-mail</Text>
      <TextInput 
        placeholder='Enter Your E-mail...'
        placeholderTextColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} 
        style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.textDark}} 
        selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
        value={email}              
        onChangeText={email => setEmail(email.trim())}         
      />
    </View>
    <View>
      <Text style={state.isLightenMode ? {...styles.text, ...styles.textLight} : {...styles.text, ...styles.textDark}}> Password </Text>
      <TextInput 
        placeholder='Enter Your password...'
        placeholderTextColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
        style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.textDark}} 
        selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}         
        value={password}              
        onChangeText={setPassword}     
        secureTextEntry={true}     
      />
    </View>
    <AppButton
              onPress={onLogin}          
              iconName='sign-in'
              iconSize={28}
              style={{marginTop: 20, width: 155, height: 55}}
            >Log In</AppButton>  
  </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    height: THEME.HEIGHT
  },
  wrapperLight: {
    backgroundColor: THEME.SECOND_COLOR_LIGHT,
  },
  wrapperDark: {
    backgroundColor: THEME.SECOND_COLOR_DARK,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: THEME.MAIN_COLOR_LIGHT,
    alignSelf: 'center',
    marginLeft: 10
  },
  textLight: {
    color: THEME.MAIN_COLOR_LIGHT,
  },
  textDark: {
    color: THEME.MAIN_COLOR_DARK,
  },
  input: {
    borderBottomWidth: 2,
    width: THEME.WIDTH * 0.7,
    fontSize: 18,
    padding: 4
  },
  inputLight: {
    borderBottomColor: THEME.MAIN_COLOR_LIGHT,
    color: THEME.MAIN_COLOR_LIGHT,
  },
  inputDark: {
    borderBottomColor: THEME.MAIN_COLOR_DARK,
    color: THEME.MAIN_COLOR_DARK,
  },
  button: {
    flexDirection: 'row',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,  
    borderRadius: THEME.BORDER_RADIUS,
    marginTop: 30
  },
  buttonLight: {
    borderColor: THEME.MAIN_COLOR_LIGHT,
  },
  buttonDark: {
    borderColor: THEME.MAIN_COLOR_DARK,
  }
});

export default LoginScreen;