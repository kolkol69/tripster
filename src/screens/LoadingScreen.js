import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'


var firebaseConfig = {
    apiKey: "AIzaSyDJ7VPaMgmjFU0bPDnnDW97lvGSwBGPwYI",
    authDomain: "tripster-5fc5d.firebaseapp.com",
    databaseURL: "https://tripster-5fc5d.firebaseio.com",
    projectId: "tripster-5fc5d",
    storageBucket: "tripster-5fc5d.appspot.com",
    messagingSenderId: "798900647773"
};

export default class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'AppNavigator' : 'SignupScreen')
        })
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})