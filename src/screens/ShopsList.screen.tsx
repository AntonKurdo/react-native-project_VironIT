import React, { FC, useState, useEffect } from 'react';
import {StyleSheet, View,  Text, TextInput} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useAppContext } from './../context/context';
import { ShopsListItem } from './../components/ShopsListItem';
import { THEME } from './../theme';
import { EvilIcons } from '@expo/vector-icons';


const ShopsList: FC = () => {
  const {state} = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const [shops, setShops] = useState(state.shops);

  useEffect(() => {
    setShops(state.shops);    
  }, [state.shops]);

  const filterShops = (text: string): void => {
    if(text) {
      setShops(state.shops.filter(shop => shop.name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setShops(state.shops)
    }
  };

  if(!state.shops.length) {
    return (
      <View style={state.isLightenMode ? {...styles.container, ...styles.containerLight} :  {...styles.container, ...styles.containerDark}}>
        <Text style={styles.emptyText}>There is no shops yet...</Text>
      </View>
    )
  }
  return (
    <View style={state.isLightenMode ? {...styles.container, ...styles.containerLight} :  {...styles.container, ...styles.containerDark}}>       
      <View style={styles.searchCont}>
        <EvilIcons style={{paddingBottom: 10}} name="search" size={35} color={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK} />
        <TextInput          
          placeholder='Enter shop name...'
          value={searchValue}
          onChangeText={text => {
            setSearchValue(text);
            filterShops(text)
          }}
          selectionColor={state.isLightenMode ? THEME.MAIN_COLOR_LIGHT : THEME.MAIN_COLOR_DARK}
          style={state.isLightenMode ? {...styles.input, ...styles.inputLight} : {...styles.input, ...styles.inputDark}}
        />
      </View>      
      <FlatList 
          data={shops}
          renderItem={({item}) => {              
             return (
                <ShopsListItem item={item} />
             )
          }}          
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {       
    flex: 1,
    width: THEME.WIDHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20   
  },
  containerLight: {
    backgroundColor: THEME.SECOND_COLOR_LIGHT
  }, 
  containerDark: {
    backgroundColor: 'lightgray'
  },
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: THEME.WIDTH * 0.9
  },
  input: {
    width: THEME.WIDTH * 0.74,
    borderBottomWidth: 2,
    padding: 5,
    marginBottom: 20,
    fontSize: 20
  },
  inputLight: {
    color: THEME.MAIN_COLOR_LIGHT, 
    borderBottomColor: THEME.MAIN_COLOR_LIGHT
  }, 
  inputDark: {
    color: THEME.MAIN_COLOR_DARK, 
    borderBottomColor: THEME.MAIN_COLOR_DARK
  },
  emptyText: {
    fontSize: 30,
    color: 'gray',
    
  }
})

export default ShopsList;