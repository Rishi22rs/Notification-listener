import React, { useEffect,useState,useRef } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image,NativeModules,Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import CollapsibleCard from '../components/CollapsibleCard'



// const translate = require('@vitalets/google-translate-api');

//AIzaSyBlivjRY_Dgj7ibNptGBDaIRV8AZ4fe1tE

import Tts from 'react-native-tts';

import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

const dimension=Dimensions.get('window')

const Home= () => {
  const [msg,setMsg]=useState('{"time":69,"groupedMessages":[]}')
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

  


useEffect(()=>{
  RNAndroidNotificationListener.getPermissionStatus().then(status=>{
    status!=="authorized"&&RNAndroidNotificationListener.requestPermission()
  })
},[])


// status.then(s=>console.log(s))

const handleCheckNotificationInterval = async () => {
  AsyncStorage.getItem('@lastNotification').then(lastStoredNotification=>{
    console.log("checking...",JSON.parse(msg).time)
    if (JSON.parse(lastStoredNotification).time!==JSON.parse(msg).time) {

      Tts.speak(`Notification from ${JSON.parse(lastStoredNotification).app.split('.')[1]}`)
      JSON.parse(lastStoredNotification).groupedMessages.length>0&&Tts.speak(`Group messages are as follows `)
      JSON.parse(lastStoredNotification).groupedMessages.length>0&&JSON.parse(lastStoredNotification).groupedMessages.map(x=>`${Tts.speak(x.title)} says ${Tts.speak(x.text)}`)
        Tts.speak(JSON.parse(lastStoredNotification).bigText)
        Tts.speak(JSON.parse(lastStoredNotification).title)
        Tts.speak(JSON.parse(lastStoredNotification).text)
        Tts.speak(JSON.parse(lastStoredNotification).summaryText)
        console.log("not same")
        setMsg(lastStoredNotification)
        setTotalNotification([...totalNotification,lastStoredNotification])
    }
  })
}

const speka=()=>{
  AsyncStorage.getItem('@lastNotification').then(lastStoredNotification=>{
    console.log("Logiing",JSON.parse(lastStoredNotification).groupedMessages)

    const appName=JSON.parse(lastStoredNotification).app.split('.')[1]

    Tts.speak(`Notification from ${appName}`)
    // JSON.parse(lastStoredNotification).groupedMessages.map(x=>Tts.speak(x.text))
      // Tts.speak(JSON.parse(lastStoredNotification).bigText)
      // Tts.speak(JSON.parse(lastStoredNotification).text)
      console.log("not same")
      setMsg(lastStoredNotification)
      setTotalNotification([...totalNotification,lastStoredNotification])
  })
}

  return (
    <SafeAreaView style={styles.container}>
      <Button title="speka" onPress={speka}/>

    {totalNotification.length>0&&<ScrollView>
      {totalNotification.map((x,key)=><View key={key}><CollapsibleCard grpMsg={JSON.parse(x).groupedMessages} time={JSON.parse(x).time} app={JSON.parse(x).app} body={JSON.parse(x).title} collapsibleText={
        `text:${JSON.parse(x).text}\n
        subText:${JSON.parse(x).title}\n
        summaryText:${JSON.parse(x).summaryText}\n
        bigText:${JSON.parse(x).bigText}\n`
      }
      iconUri={JSON.parse(x).icon}/></View>)}
    </ScrollView>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    height:dimension.height
  }
});

export default Home;
