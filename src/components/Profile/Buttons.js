import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base';
import Icon from '@expo/vector-icons/AntDesign';
import { View, Text } from "react-native";

/**Edit profile and Settings Buttons **/
const Buttons = props => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
            <View
                style={{ flexDirection: 'row' }}>
                {/** Edit profile takes up 3/4th **/}
                <Button bordered dark
                    style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>
                {/** Settings takes up  1/4th place **/}
                <Button bordered dark style={{
                    flex: 1,
                    height: 30,
                    marginRight: 10, marginLeft: 5,
                    justifyContent: 'center'
                }}>
                    <Icon name="circledown" size={15} style={{ color: 'black' }}></Icon></Button>
            </View>
        </View>
  )
}

Buttons.propTypes = {

}

export default Buttons
