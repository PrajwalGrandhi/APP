import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
//import {LottieView} from 'react-native-web-lottie'

import AuthScreen from './screens/AuthScreen'
import PomodoroTimer from './screens/PomodoroTimer'
import Matrix from './screens/Matrix'
import SettingScreen from './screens/SettingScreen'
import Drawer from './screens/Drawer'
import NotificationScreen from './screens/NotificationScreen'
import ToDoScreen from './screens/ToDo';
import TodoForm from './components/ToDoForm';

export default class App extends React.Component{
  render(){
    return (
      <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  PomodoroTimer: {screen:PomodoroTimer},
  Matrix: {screen:Matrix},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      //console.log(routeName)
      if(routeName === "PomodoroTimer"){
        return(
          <Image
          source={require("./assets/icon.png")}
          style={{width:40, height:40}}
        />
        )

      }
      else if(routeName === "Matrix"){
        return(
          <Image
          source={require('./assets/splash.png')}
          style={{width:40, height:40}}
        />)

      }
    }
  })
}
);
const AppStackNavigator=createStackNavigator({TodoForm:{screen:TodoForm}},/*{initialRouteName:'PomodoroTimer'}*/);

const AppDrawerNavigator=createDrawerNavigator({Main:{screen:TabNavigator},ToDoList:{screen:ToDoScreen},Settings:{screen:SettingScreen},Notification:{screen:NotificationScreen}},{contentComponent:Drawer},{initialRouteName:'Main'})

const switchNavigator=createSwitchNavigator({LoginScreen:{screen:AuthScreen},Drawer:{screen:AppDrawerNavigator},StackNavigator:{screen:AppStackNavigator}})

const AppContainer =  createAppContainer(switchNavigator);