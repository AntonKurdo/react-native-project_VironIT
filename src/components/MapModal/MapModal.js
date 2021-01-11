import React, { useState, useContext, useEffect, useCallback } from 'react';
import {StyleSheet, View, Modal } from 'react-native';
import MapView from 'react-native-maps';
import { Context } from '../../context/context';
import { AppButton } from '../AppButton';
import { THEME } from '../../theme';
import { nightStyles } from './MapStyles_Night';
import { getData } from './../../services/asyncStorage.service';
import { selectIcon } from './../../services/mapIconsSelect.service';

export const MapModal = () => {

    const { state, coords, setMapModal } = useContext(Context); 
     
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
                      state.shops.map((shop, index) => {
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
    }
});