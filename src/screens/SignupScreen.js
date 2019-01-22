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
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up"  onPress={() => this.props.navigation.navigate('LoginScreen')} />
        <Button
          title="Already have an account? Sign in" 
          onPress={() => this.props.navigation.navigate('LoginScreen')}
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
    marginTop: 8
  }
})