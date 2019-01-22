import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,Image } from 'react-native'


export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  
  render() {
    return (
      <View style={styles.container}>
      <Image  style={{width:250, height: 250}}
      source={require('../images/Logo.png')}/>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign in" onPress={()=> this.props.navigation.navigate('MainTabNavigator')} />
        <Button title="Don't have an account? Sign Up" 
          onPress={() => this.props.navigation.navigate('SignupScreen')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10
  },


  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
})
