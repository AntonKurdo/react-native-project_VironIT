import * as Location from 'expo-location';

export const locale = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  return location;
};