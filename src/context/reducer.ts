import { CHANGE_THEME, SET_LOCATION, SET_MAP_MODAL, SHOW_LOADER, HIDE_LOADER } from './types';

interface iCoords {
  latitude: number | null, 
  longitude: number | null
}

interface iAction {
  type: string, 
  location?: string,
  coords?: iCoords
};

interface iState {  
  isLightenMode: boolean,
  location: null | string,
  coords: iCoords
};

const handlers = {
  [CHANGE_THEME]: (state: iState) => ({...state, isLightenMode: !state.isLightenMode}),
  [SET_LOCATION]: (state: iState, {location, coords}: iAction) => ({...state, location, coords}),
  [SET_MAP_MODAL]: state => ({...state, isMapVisible: !state.isMapVisible}),
  [SHOW_LOADER]: state => ({...state, isLoader: true}),
  [HIDE_LOADER]: state => ({...state, isLoader: false})
};


export const reducer = (state: iState, action: iAction): any => { 
  return handlers[action.type](state, action);
};