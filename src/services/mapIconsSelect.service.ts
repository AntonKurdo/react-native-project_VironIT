import { ImageURISource } from "react-native";

export const selectIcon = (shopType: string): ImageURISource | number => {
  switch(shopType) {
    case 'sport': 
     return require('../../assets/mapIcons/sport.png');
    case 'tourism': 
     return require('../../assets/mapIcons/tourism.png');
    case 'bookshop': 
     return require('../../assets/mapIcons/books.png');
    case 'bakery': 
     return require('../../assets/mapIcons/bakery.png');
    case 'antique': 
     return require('../../assets/mapIcons/antique.png');
    default :
     return 0;
  }
};