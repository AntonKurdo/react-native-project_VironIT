import React, {useReducer} from 'react';
import {Context} from './context';
import {reducer} from './reducer';
import { CHANGE_THEME, SET_LOCATION, SET_MAP_MODAL, SHOW_LOADER, HIDE_LOADER } from './types';

export const AppState = ({children}) => {

    const INITIAL_STATE = {   
        isLightenMode: true,
        location: null,
        coords: {
            latitude: null, 
            longitude: null
        },
        isMapVisible: false,
        isLoader: false
    };

    const [state,
        dispatch] = useReducer(reducer, INITIAL_STATE);
 
    const changeTheme : any = () => dispatch({type: CHANGE_THEME})
    const setLocation : any = (location, coords) => dispatch({type: SET_LOCATION, location, coords});
    const setMapModal : any = () => dispatch({type: SET_MAP_MODAL});
    const showLoader : any = () => dispatch({type: SHOW_LOADER});
    const hideLoader : any = () => dispatch({type: HIDE_LOADER});

    return <Context.Provider
        value={{
        state,
        coords: state.coords,     
        changeTheme,
        setLocation,
        setMapModal,
        showLoader,
        hideLoader
    }}>{children}</Context.Provider>
};