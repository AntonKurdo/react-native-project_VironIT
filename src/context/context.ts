import { createContext, useContext } from 'react';
import { iNewShop } from '../screens/CreateShopForm.screen';
import { LatLng } from 'react-native-maps';

type iContext = {
  state?: iState,
  coords?: LatLng,     
  changeTheme?: () => void,
  setLocation?:  (location: string, coords: LatLng ) => void,
  setMapModal?: () => void,
  showLoader?: () => void,
  hideLoader?: () => void,
  setActiveUser?: (useName: string) => void, 
  clearActiveUser?: () => void,
  setShops?:  (shop: iNewShop) => void,
  clearShops?:  () => void,
  setRadius?:  (radius: number) => void      
};

interface iState {
  activeUser: string,
  isLightenMode: boolean,
  location: null | string,
  coords: LatLng,
  isMapVisible: boolean,
  isLoader: boolean,
  shops: Array<iNewShop>,       
  radius: number
};


export const useAppContext = () => useContext(AppContext); 
const AppContext =  createContext<iContext>({});

export default AppContext;