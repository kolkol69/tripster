import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
// import the different screens
import LoadingScreen from './LoadingScreen'
import SignupScreen from './SignupScreen'
import LoginScreen from './LoginScreen'
import AppNavigator from './src/navigation/AppNavigator'
// create our app's navigation stack
const App = SwitchNavigator(
  {
    SignupScreen,
    LoginScreen,
    AppNavigator
  },
  {
    initialRouteName: 'LoginScreen'
  }
)
export default App