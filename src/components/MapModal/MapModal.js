import React, { useState, useContext, useEffect } from 'react';
import {StyleSheet, View, Modal, Text, Image,  TouchableOpacity, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../../context/context';
import { THEME } from '../../theme';
import { nightStyles } from './MapStyles_Night';
import { selectIcon } from './../../services/mapIconsSelect.service';
import { getData } from './../../services/asyncStorage.service';
import {StatusBar} from 'react-native';

import Geofence from 'react-native-expo-geofence';

export const MapModal = () => {    
    
    const { state, coords, setMapModal, setShops } = useContext(Context); 

    const [localShops, setLocalShops] = useState(state.shops);
    const [favouriteMode, setFavouriteMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPopupShow, setIsPopupShow] = useState(false)
    const [popupInfo, setPopupInfo] = useState({name: '', latitude: '', longitude: '', isFavourite: false, id: '', isClosest: false, distance: null});     

    useEffect(() => {
        setLocalShops(state.shops)
    }, [state.shops]);

    useEffect(() => {
     if(state.radius && state.isMapVisible) {
        const points = state.shops.filter(shop => shop.isFavourite).map(shop => {
            return {                 
                title: shop.name,
                key: shop.id,
                latitude: parseFloat(shop.latitude),
                longitude: parseFloat(shop.longitude)                 
            }
        });        
        const result =  Geofence.filterByProximity(coords, points, state.radius ? parseInt(state.radius) / 1000 : 0 );         
        result.sort((a, b) => a.distanceInKM - b.distanceInKM);           
         if(result.length) {
            const nearestShop =  state.shops.find(shop => shop.name === result[0].title);                    
            if(nearestShop) {
                pushPopupInfo(nearestShop.name, nearestShop.latitude, nearestShop.longitude, nearestShop.isFavourite, nearestShop.id, true, result[0].distanceInKM)
                setIsPopupShow(true);            
            }            
        }
     }
    }, [state.isMapVisible]);  

   const pushPopupInfo = (name, lat, long, isF, id, isClosest, distance) => {         
        setIsPopupShow(true);
        setPopupInfo({
            name,
            latitude: lat,
            longitude: long,
            isFavourite: isF,
            id,
            isClosest,
            distance
        });        
   };

    const filterFavouriteShops = () => {
        if(!favouriteMode) {
            const favouriteShops = state.shops.filter(shop => shop.isFavourite);      
            setLocalShops(favouriteShops);
            setFavouriteMode(true);
        } else {
            setLocalShops(state.shops);
            setFavouriteMode(false);
        }       
        setInputValue('');
        setIsPopupShow(false);
    };

    const likeShop = async (id) => {       
        try {
            const data = JSON.parse(await getData());
            const user = data.find(user => user.login === state.activeUser);
            const newShops = user.shops.map(shop => {
            if(shop.id === id) {
                shop.isFavourite = !shop.isFavourite
            }
            return shop;
            });
            setShops(newShops);              
            setPopupInfo({...popupInfo, isFavourite: !popupInfo.isFavourite})
            await AsyncStorage.setItem('users', JSON.stringify(data));     
        } catch(e) {
            console.log(e)
        }
    };

    const filterByShopName = (text) => {
        if(text && favouriteMode) {
            setLocalShops(localShops.filter(shop => shop.name.toLowerCase().includes(text.toLowerCase())));
        } else if(text && !favouriteMode) {
            setLocalShops(state.shops.filter(shop => shop.name.toLowerCase().includes(text.toLowerCase())));
        }else {
            setLocalShops(state.shops)
        }
    };

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
                    initialRegion={{
                        ...coords,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                    }}               
                >
                    <MapView.Marker                        
                        coordinate={coords}
                        title='Now You are here!'                                              
                    />  

                  {
                      state.radius > 0 && (
                        <MapView.Circle                            
                            center = {coords }
                            radius = { state.radius ? parseInt(state.radius) : 0 }
                            strokeWidth = { 1 }
                            strokeColor = { state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK }
                            fillColor = { 'rgba(230,238,255,0.5)' }
                            onRegionChangeComplete = { () =>  console.log('hohoho') }
                    />
                      )
                  }

                    {
                     localShops.map((shop, index) => {
                        return (
                          <MapView.Marker
                            onPress={() => pushPopupInfo(shop.name, shop.latitude, shop.longitude, shop.isFavourite, shop.id, false, null)}
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
            <TouchableOpacity
                style={styles.btnBack}
                 onPress={() => {
                    setMapModal();
                    setIsPopupShow(false);
                }}
            >   
                <AntDesign name="arrowleft" size={40} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK} />
            </TouchableOpacity>
           
             <TouchableOpacity style={styles.btnLiked} onPress={filterFavouriteShops}>
                {
                    favouriteMode 
                        ? <AntDesign name="heart" size={40} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK} />
                        : <AntDesign name="hearto" size={40} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.SECOND_COLOR_DARK} />
                }
            </TouchableOpacity>

            <View style={state.isLightenMode ? {...styles.inputCont, ...styles.inputContLight} : {...styles.inputCont, ...styles.inputContDark}}>              
                <TextInput 
                    selectionColor={state.isLightenMode ? 'black' : 'white'}
                    placeholderTextColor={state.isLightenMode ? 'black' : 'white'}
                    placeholder='Begin to enter name of shop...'
                    style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.inputDark}}
                    value={inputValue}
                    onChangeText={text => {
                        setInputValue(text);
                        filterByShopName(text);
                    }}
                />
            </View>    
            {
                isPopupShow && 
                <View style={styles.popup}>       
                { popupInfo.isClosest && <Text style={styles.popupText}>Closest shop to You is:</Text>  }    
                {popupInfo.distance && <Text style={{...styles.popupText, fontSize: 22,position: 'absolute', left: 10}}> {popupInfo.distance.toFixed(2)} km </Text> }
                    <Image 
                        style={styles.img}                   
                        source={require(`../../../assets/shop.png`)}
                    />                
                    <Text style={styles.popupText}>{popupInfo.name}</Text>
                    <Text style={styles.popupText}>lat: {popupInfo.latitude}, lon: {popupInfo.longitude} </Text>
                    <TouchableOpacity style={styles.btnClose} onPress={() => setIsPopupShow(false)}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLike} onPress={likeShop.bind(null, popupInfo.id)}>
                        {
                            popupInfo.isFavourite 
                                ? <AntDesign name="heart" size={24} color="white" />
                                : <AntDesign name="hearto" size={24} color="white" />
                        }
                    </TouchableOpacity>                
                </View>   
            }                    
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
        top: StatusBar.currentHeight + 10, 
        right: 20
    },
    inputCont: {
        padding: 8,
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',          
        borderRadius: 5
    },
    inputContLight: {
        backgroundColor: 'rgba(0,0,0,0.15)'     
    },
    inputContDark: {
        backgroundColor: 'rgba(255,255,255,0.2)'       
    },
    input: {
        width: THEME.WIDTH * 0.8,
        borderBottomWidth: 2,
        padding: 5,
        fontSize: 20       
    },
    inputLight: {
        color: THEME.MAIN_COLOR_DARK,
        borderBottomColor: 'black'
    },
    inputDark: {
        color: THEME.SECOND_COLOR_DARK,
        borderBottomColor: 'white' 
    },    
    popup: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        width: THEME.WIDTH * 0.9,
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 50,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'  
    },
    img: {
        width: THEME.WIDTH * 0.45,
        height: 130,
        resizeMode: 'contain'
    },
    popupText: {
        color: 'white',
        fontWeight: 'bold'
    },
    btnClose: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    btnLike: {
        position: 'absolute',
        top: 15,
        left: 15
    },
    btnBack: {
        position: 'absolute',
        top:  StatusBar.currentHeight + 10,
        left: 20
    }
});