/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState } from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import Tts from 'react-native-tts';

import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

const App= () => {
  let msg='{"time":69,"groupedMessages":[]}'
  useEffect(()=>{
    // RNAndroidNotificationListener.requestPermission()
    setInterval(()=>{
      handleCheckNotificationInterval()
    },10000)
  },[])

  const speka=async()=>{
    const lastStoredNotification = await AsyncStorage.getItem('@lastNotification')
    // console.log(lastStoredNotification)
    JSON.parse(msg).groupedMessages.map(x=>Tts.speak(x.text))
    Tts.speak(JSON.parse(lastStoredNotification).bigText)
    // console.log(lastStoredNotification)
  }

// To open the Android settings so the user can enable it
const status = RNAndroidNotificationListener.getPermissionStatus()

status.then(s=>console.log(s))

const handleCheckNotificationInterval = async () => {
  AsyncStorage.getItem('@lastNotification').then(lastStoredNotification=>{
    console.log(lastStoredNotification)
    console.log("checking...",JSON.parse(msg).time)
    if (JSON.parse(lastStoredNotification).time!==JSON.parse(msg).time) {
        JSON.parse(lastStoredNotification).groupedMessages.map(x=>Tts.speak(x.text))
        Tts.speak(JSON.parse(lastStoredNotification).bigText)
        Tts.speak(JSON.parse(lastStoredNotification).text)
        console.log("not same")
        msg=lastStoredNotification
        // console.log(msg)
    }
  })
}


  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World!</Text>
      <Button onPress={()=>speka()} title="Speka"/>
      {/* <Text>{status}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  }
});

export default App;
