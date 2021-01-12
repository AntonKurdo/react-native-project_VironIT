import React, { useState, useContext, useEffect } from 'react';
import {StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; 
import { Context } from '../../context/context';
import { AppButton } from '../AppButton';
import { THEME } from '../../theme';
import { nightStyles } from './MapStyles_Night';
import { selectIcon } from './../../services/mapIconsSelect.service';

export const MapModal = () => {

    const { state, coords, setMapModal } = useContext(Context); 

    const [shops, setShops] = useState(state.shops);
    const [favouriteMode, setFavouriteMode] = useState(false);

    useEffect(() => {
        setShops(state.shops)
    }, [state.shops]);
    
    const filterFavouriteShops = () => {
        if(!favouriteMode) {
            const favouriteShops = state.shops.filter(shop => shop.isFavourite === true);      
            setShops(favouriteShops);
            setFavouriteMode(true);
        } else {
            setShops(state.shops);
            setFavouriteMode(false);
        }
       
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={state.isMapVisible}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <MapView
                    customMapStyle={state.isLightenMode ? [] : nightStyles}
                    style={styles.map}
                    region={{
                   ...coords,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                    <MapView.Marker
                        coordinate={coords}
                        title='Now You are here!'                                              
                    />
                    {
                     shops.map((shop, index) => {
                        return (
                          <MapView.Marker
                            icon={selectIcon(shop.shopType)}
                            key={index}
                            title={shop.name}
                            coordinate={{latitude: parseFloat(shop.latitude), longitude: parseFloat(shop.longitude) }}                                                                     
                          />
                        )
                      })
                    }
                </MapView>
            </View>
           
            <AppButton 
                style={{position: 'absolute', top: 20, right: 20, backgroundColor: 'white'}} 
                iconName='close'
                onPress={setMapModal}
            > Close </AppButton>

           
             <TouchableOpacity style={styles.btnLiked} onPress={filterFavouriteShops}>
                {
                    favouriteMode 
                        ? <AntDesign name="heart" size={40} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK} />
                        : <AntDesign name="hearto" size={40} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK} />
                }
            </TouchableOpacity>
        
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: THEME.WIDTH,
        height: THEME.HEIGHT
    },
    btnLiked: {       
        position: 'absolute',
        top: 25, 
        left: 20
    }
});