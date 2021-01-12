import React, {FC, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
// import { iNewShop } from '../screens/CreateShopForm.screen';
import { THEME } from './../theme';
import { AntDesign } from '@expo/vector-icons';
import { Context } from './../context/context';
import { getData } from './../services/asyncStorage.service';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ShopsListItemProps {
  // item: iNewShop  
  item: any
};

export const ShopsListItem: FC<ShopsListItemProps> = ({item}) => {

  const {state, setShops} = useContext(Context); 

  const likeShop = async (id) => {
    try{
      const data = JSON.parse(await getData());
      const user = data.find(user => user.login === state.activeUser);
      const newShops = user.shops.map(shop => {
        if(shop.id === id) {
          shop.isFavourite = !shop.isFavourite
        }
        return shop;
      });
      setShops(newShops);
      await AsyncStorage.setItem('users', JSON.stringify(data));     
    } catch(e) {
      console.log(e)
    }
  };

  const removeShop = async (id: string, name: string): Promise<any> => {
    Alert.alert(
      "Removing shop...",
      `Are sure to remove ${name}?`,
      [
        {
          text: "Cancel",          
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          try{
            const data = JSON.parse(await getData());
            const user = data.find(user => user.login === state.activeUser);
            const newShops = user.shops.filter(shop => shop.id !== id);
            setShops(newShops);
            user.shops = newShops;    
            await AsyncStorage.setItem('users', JSON.stringify(data));           
          } catch(e) {
            console.log(e)
          }
        }}
      ],
      { cancelable: false }
    );   
  };



  return (
    <TouchableOpacity  
      style={state.isLightenMode ? {...styles.container, ...styles.containerLight} :  {...styles.container, ...styles.containerDark}} 
      onPress={likeShop.bind(null, item.id)}
      onLongPress={removeShop.bind(null, item.id, item.name)}
    >    
        <Text style={state.isLightenMode ? {...styles.text, ...styles.textLight} : {...styles.text, ...styles.textDark}}>{item.name}</Text>
        <Text style={styles.subtext}>Lat {item.latitude}</Text>
        <Text style={styles.subtext}>Long {item.longitude}</Text>
        {
          item.isFavourite && 
          <View style={styles.btnLike}>
            <AntDesign name="like1" size={28} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} />
          </View>
        }        
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    width: THEME.WIDTH * 0.8,
    borderRadius: 5,
    paddingVertical: 5,
    marginBottom: 10    
  },
  containerLight: {
    borderColor: THEME.MAIN_COLOR_LIGHT,
  }, 
  containerDark: {
    borderColor: THEME.MAIN_COLOR_DARK,
  }, 
  text: {
    fontSize: 20,
    fontWeight: '700'    
  },
  textLight: {
    color: THEME.MAIN_COLOR_LIGHT
  },
  textDark: {
    color: THEME.MAIN_COLOR_DARK
  },
  subtext: {
    fontSize: 10,
    color: 'gray'
  },
  btnLike: {
    position: 'absolute',
    right: 10,
    top: '30%'
  }
})