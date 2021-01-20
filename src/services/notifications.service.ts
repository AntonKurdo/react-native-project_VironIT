import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const askForNotificationPermission = async (): Promise<boolean> => {
    const { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  if(status !== 'granted') {
    Alert.alert('Error', 'You did not allow getting notifications' );
    return false;
  } 
  return true;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
});

export const sendNotification = async (shopName: string, distance: number): Promise<void> => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: `${shopName} is near. Distance - ${distance} km`,
      body: 'Open map for details...'
    },
    trigger: null
  });
}
 