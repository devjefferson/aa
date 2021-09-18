import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';


export default function useNotification(){
  
  async function registerForPushNotification(){
    let token;
    if(Constants.isDevice){
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if(existingStatus !== 'granted'){
      const { status } = await Notifications.getPermissionsAsync()
      finalStatus = status
    }

    if(existingStatus !== 'granted'){
      alert('Failed to get push token for push notification!');
      return;
    }

    token = await Notifications.getExpoPushTokenAsync()


  }else {
    alert('Must use physical device for Push Notifications');
  }

  if(Platform.OS === 'android'){
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token
  }

  return {
    registerForPushNotification,
  }
}