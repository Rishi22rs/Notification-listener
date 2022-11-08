import React, { useEffect, useState } from 'react'
import {Text,View,Image,Dimensions,Switch,FlatList,SafeAreaView} from 'react-native'

const dimension=Dimensions.get('screen')
const AppListSection=({icon,appName,isEnabled})=>{
    return(
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',width:dimension.width,backgroundColor:'white',justifyContent:'space-between',paddingRight:20,paddingLeft:10,marginBottom:2}}>
            <Image style={{height:70,width:70,padding:10}} source={{uri:`data:image/gif;base64,${icon}`}}/>
            <Text>{appName}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={true? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
            />
        </View>
    )
}

const AppList=({route})=>{

  console.log("AppList",routes)


  const renderItem = ({ item }) => (
    !item.appName.startsWith("com.")&&<AppListSection icon={item.icon} appName={item.packageName} isEnabled={true}/>
  )


    return (
      <SafeAreaView style={{flex: 1}}>      
        {/* <FlatList
        data={route.params.appDetails}
        renderItem={renderItem}
        keyExtractor={item=>item.packageName}
      /> */}
      </SafeAreaView>)

}

export default AppList