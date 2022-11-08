import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import AppList from './screens/AppList';
import RNInstalledApplication from 'react-native-installed-application';

const Tab = createMaterialTopTabNavigator();

function Navigation() {

  const [appDetails,setAppDetails]=useState()

  useEffect(()=>{
    getApplication()
  },[])

  const getApplication = ()=>{
    RNInstalledApplication.getApps()
    .then(apps => {
        setAppDetails(apps)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}  options={({ route }) => ({ appDetails: appDetails })}/>
        <Tab.Screen name="App List" component={AppList}  options={({ route }) => ({ appDetails: appDetails })}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation