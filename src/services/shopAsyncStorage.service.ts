import AsyncStorage from '@react-native-async-storage/async-storage';
import { shopValidationSchema } from './../validation/createNewShop.scheme';
import {Alert} from 'react-native';
import { getData } from './asyncStorage.service';


export const getShops = async() : Promise <string> => {
  try {
      const data = await AsyncStorage.getItem('shops');   
      return data
          ? data
          : '[]';
  } catch (e) {
      console.log(e.message);
  }
};


export const saveShops = async(newShopObj, activeUser) : Promise <boolean> => {
  try {
      const validate = await shopValidationSchema.validate(newShopObj);
      const users = JSON.parse(await getData());
      const currentUser =  users.find(user => user.login === activeUser);      
      if (!validate.error && currentUser) {
          const usersWithShops = users.map(user => {
            if(user.login === activeUser) {
              if(user.shops.length !== 0) {
                user.shops = [...user.shops, newShopObj];
              } else {
                user.shops = [newShopObj];
              }
            }
            return user;
          })
          await AsyncStorage.setItem('users', JSON.stringify(usersWithShops));         
          Alert.alert('Success', `New shop has been added to the ${activeUser}'s map!!!`);
          return true;         
      } else {           
          Alert.alert('Validation Error...', 'All fields should be not empty!!!');
          return false;
      }
  } catch (e) {
      console.log(e.message);
  }
};