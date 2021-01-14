import React, {useReducer} from 'react';
import {Context} from './context';
import {reducer} from './reducer';
import { CHANGE_THEME, SET_LOCATION, SET_MAP_MODAL, SHOW_LOADER, HIDE_LOADER, SET_ACTIVE_USER, CLEAR_ACTIVE_USER, SET_SHOPS, CLEAR_SHOPS, SET_RADIUS } from './types';

export const AppState = ({children}) => {

    const INITIAL_STATE = {   
        activeUser: '',
        isLightenMode: true,
        location: null,
        coords: {
            latitude: null, 
            longitude: null
        },
        isMapVisible: false,
        isLoader: false,
        shops: [],       
        radius: '0'
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
    const changeTheme : any = () => dispatch({type: CHANGE_THEME})
    const setLocation : any = (location, coords) => dispatch({type: SET_LOCATION, location, coords});
    const setMapModal : any = () => dispatch({type: SET_MAP_MODAL});
    const showLoader : any = () => dispatch({type: SHOW_LOADER});
    const hideLoader : any = () => dispatch({type: HIDE_LOADER});
    const setActiveUser : any = (userName) => dispatch({type: SET_ACTIVE_USER, userName});
    const clearActiveUser : any = () => dispatch({type: CLEAR_ACTIVE_USER});
    const setShops : any = (shops) => dispatch({type: SET_SHOPS, shops});
    const clearShops : any = () => dispatch({type: CLEAR_SHOPS}); 
    const setRadius : any = (radius) => dispatch({type: SET_RADIUS, radius}); 
 

    return <Context.Provider
        value={{
        state,
        coords: state.coords,     
        changeTheme,
        setLocation,
        setMapModal,
        showLoader,
        hideLoader,
        setActiveUser, 
        clearActiveUser,
        setShops,
        clearShops,
        setRadius       
    }}>{children}</Context.Provider>
};