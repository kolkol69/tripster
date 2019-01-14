import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base';
import Icon from '@expo/vector-icons/EvilIcons';
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import {fetchUsers} from '../../actions/fetchUsersAction';
import Spinner from '../Spinner';

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
                }}
                    onPress={() => { props.fetchUsers(props.userData.id);}}>
                    {props.loading ?  <Spinner/> : <Icon name="refresh" size={25} style={{ color: 'black' }}/>}</Button>
            </View>
        </View>
    )
}

Buttons.propTypes = {

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (userId) => { dispatch(fetchUsers(userId)) }
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.fetchedUsers.usersData,
        loading: state.fetchedUsers.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
