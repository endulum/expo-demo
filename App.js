import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useRef, useEffect } from 'react';

import Clock from './components/Clock';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const responseListener = useRef(null)

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      if (response.notification.request.content.data?.url) {
        Linking.openURL(response.notification.request.content.data.url)
      }
    })
  }, [])

  async function invokeNotif() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification Title",
        body: 'Notification body.',
        data: { 
          url: 'https://github.com'
        },
      },
      trigger: null
    });
  }

  return (
    <View style={styles.container}>
      <Clock onAlert={invokeNotif}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
