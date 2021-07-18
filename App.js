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
import CollapsibleCard from './components/CollapsibleCard'

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
    <SafeAreaView >
      <Text>Let's read you notifications.</Text>

    {totalNotification.length>0&&<ScrollView>
      {totalNotification.map((x,key)=><View><CollapsibleCard time={JSON.parse(x).time} app={JSON.parse(x).app} body={JSON.parse(x).title} collapsibleText={
        `titleBig:${JSON.parse(x).titleBig}\n
        text:${JSON.parse(x).text}\n
        subText:${JSON.parse(x).title}\n
        summaryText:${JSON.parse(x).summaryText}\n
        bigText:${JSON.parse(x).bigText}\n`
      }/></View>)}
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
