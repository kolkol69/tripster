import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
// import the different screens
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'
import MainTabNavigator from './MainTabNavigator'
// create our app's navigation stack
const App = SwitchNavigator(
  {
    LoginScreen,
    MainTabNavigator,
    SignupScreen,

  },
)
export default App