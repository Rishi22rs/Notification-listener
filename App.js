/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState,useRef } from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image,NativeModules
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

// const translate = require('@vitalets/google-translate-api');

//AIzaSyBlivjRY_Dgj7ibNptGBDaIRV8AZ4fe1tE

import Tts from 'react-native-tts';

import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

const App= () => {
  // let msg='{"time":69,"groupedMessages":[]}'
  const [msg,setMsg]=useState('{}')
  const [totalNotification,setTotalNotification]=useState([])

  useInterval(()=>{
    handleCheckNotificationInterval()
  },3000)

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const OnClicking=()=>{
    NativeModules.AppListModule.show("THis is a long journy",(msgFromNative)=>{
      msgFromNative.map(x=>console.log(x,'\n'))
    })
  }



// To open the Android settings so the user can enable it
const status = RNAndroidNotificationListener.getPermissionStatus()

// status.then(s=>console.log(s))

const handleCheckNotificationInterval = async () => {
  AsyncStorage.getItem('@lastNotification').then(lastStoredNotification=>{
    console.log("checking...",JSON.parse(msg).time)
    if (JSON.parse(lastStoredNotification).time!==JSON.parse(msg).time) {
        JSON.parse(lastStoredNotification).groupedMessages.map(x=>Tts.speak(x.text))
        Tts.speak(JSON.parse(lastStoredNotification).bigText)
        Tts.speak(JSON.parse(lastStoredNotification).text)
        console.log("not same")
        setMsg(lastStoredNotification)
        setTotalNotification([...totalNotification,lastStoredNotification])
    }
  })
}

  return (
    <SafeAreaView style={styles.container}>
      <Text>Let's read you notifications.</Text>
      <Button onPress={()=>OnClicking()} title="Press me"/>
      <Image style={{width: 100, height: 50}} source={{uri:JSON.parse(msg).icon}}/>
    {totalNotification.length>0&&<ScrollView>
      {totalNotification.map((x,key)=><Text key={key}>{JSON.parse(x).text}</Text>)}
    </ScrollView>}
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
