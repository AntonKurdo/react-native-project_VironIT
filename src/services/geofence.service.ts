import Geofence from 'react-native-expo-geofence';

export const getNearestShop = (shops, radius, coords) => {
    const points = shops
        .filter(shop => shop.isFavourite)
        .map(shop => {
            return {
                title: shop.name,
                key: shop.id,
                latitude: parseFloat(shop.latitude),
                longitude: parseFloat(shop.longitude)
            }
        });
    const result = Geofence.filterByProximity(
        coords, 
        points, 
        radius
            ? parseInt(radius) / 1000
            : 0
        );
    result.sort((a, b) => a.distanceInKM - b.distanceInKM);
    if (result.length) {
        const nearestShop = shops.find(shop => shop.name === result[0].title);
        nearestShop.distance = result[0].distanceInKM;
        return nearestShop;
    } else {
      return false;
    }
};