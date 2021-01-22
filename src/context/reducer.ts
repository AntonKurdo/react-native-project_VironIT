import { LatLng } from 'react-native-maps';
import { CHANGE_THEME, SET_LOCATION, SET_MAP_MODAL, SHOW_LOADER, HIDE_LOADER, SET_ACTIVE_USER, CLEAR_ACTIVE_USER, SET_SHOPS, CLEAR_SHOPS, SET_RADIUS } from './types';

interface iAction {
  type: string, 
  location?: string,
  coords?: LatLng,
  userName?: string,
  shops?: object[],
  radius?: number
};

const handlers = {
  [CHANGE_THEME]: (state) => ({...state, isLightenMode: !state.isLightenMode}),
  [SET_LOCATION]: (state, {location, coords}: iAction) => ({...state, location, coords}),
  [SET_MAP_MODAL]: state => ({...state, isMapVisible: !state.isMapVisible}),
  [SHOW_LOADER]: state => ({...state, isLoader: true}),
  [HIDE_LOADER]: state => ({...state, isLoader: false}),
  [SET_ACTIVE_USER]: (state, {userName}) => ({...state, activeUser: userName}),
  [CLEAR_ACTIVE_USER]: (state) => ({...state, activeUser: ''}),
  [SET_SHOPS]: (state, {shops}) => ({...state, shops}),
  [CLEAR_SHOPS]: state => ({...state, shops: []}),
  [SET_RADIUS]: (state, {radius}) => ({...state, radius})
};


export const reducer = (state, action: iAction): any => { 
  return handlers[action.type](state, action);
};