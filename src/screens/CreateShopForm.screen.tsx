import React, {FC, useContext, useState} from 'react';
import {StyleSheet, Text,  View, TextInput} from 'react-native';
import { THEME } from './../theme';
import { Context } from './../context/context';
import {Picker} from '@react-native-picker/picker';
import { AppButton } from '../components/AppButton';
import { saveShops } from '../services/shopAsyncStorage.service';
import { useNavigation } from '@react-navigation/native';
import { getData } from './../services/asyncStorage.service';

export interface iNewShop {
  id?: string,
  name: string,
  shopType: string,
  latitude: string,
  longitude: string,
  isFavourite: boolean
};

const CreateShopForm: FC = () => {
  const {state, setShops} = useContext(Context);
  const navigation = useNavigation();
  const [name, setName] = useState<string>(null);
  const [shopType, setShopType] = useState<string | number>('sport');
  const [latitude, setLatitude] = useState<string>(null);
  const [longitude, setLongitude] = useState<string>(null);

  const addNewShop = async () => {
    const newShop: iNewShop = {
      name, shopType: shopType.toString(), latitude, longitude, isFavourite: false
    };

   if(await saveShops(newShop, state.activeUser)) {
    const users = JSON.parse(await getData());
    const {shops} = users.find(user => user.login === state.activeUser);
    setShops(shops);
    setName(null);
    setShopType('sport');
    setLatitude(null);
    setLongitude(null);    
    navigation.navigate('Main');
   };
  }  

  return (  
    <View style={state.isLightenMode ? {...styles.container, ...styles.containerLight} :  {...styles.container, ...styles.containerDark}}>   
      <Text style={state.isLightenMode ? {...styles.text, ...styles.textLight} : {...styles.text, ...styles.textDark}}> Add new shop to the map: </Text>
      <TextInput 
        placeholder='Enter name...'
        placeholderTextColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} 
        selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
        style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.inputDark}}
        value={name} 
        onChangeText={setName}
      />
      <Picker
        selectedValue={shopType}
        style={state.isLightenMode ? {...styles.picker, ...styles.pickerLight} : {...styles.picker, ...styles.pickerDark}}
        onValueChange={(itemValue) =>
          setShopType(itemValue)
        }>
          <Picker.Item label="Sport" value="sport" />
          <Picker.Item label="Tourism" value="tourism" />
          <Picker.Item label="Bookshop" value="bookshop" />
          <Picker.Item label="Bakery" value="bakery" />
          <Picker.Item label="Antique" value="antique" />
      </Picker>
      <TextInput 
        keyboardType='numeric'
        placeholder='Enter latitude...'
        placeholderTextColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} 
        selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
        style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.inputDark}}
        value={latitude}
        onChangeText={setLatitude}
      />
       <TextInput 
        keyboardType='numeric'
        placeholder='Enter longitude...'
        placeholderTextColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} 
        selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
        style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.inputDark}}
        value={longitude}
        onChangeText={setLongitude} 
      />
      <AppButton 
        style={{marginTop: 15}}
        iconName='plus'
        onPress={addNewShop}
      > Add </AppButton>
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  textLight: {
    color: THEME.MAIN_COLOR_LIGHT
  },
  textDark: {
    color: THEME.MAIN_COLOR_DARK
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
  picker: {
    marginVertical: 10,
    width: THEME.WIDTH * 0.7    
  },
  pickerLight: {
    color: THEME.MAIN_COLOR_LIGHT
  },
  pickerDark: {
    color: THEME.MAIN_COLOR_DARK
  }
})

export default CreateShopForm;