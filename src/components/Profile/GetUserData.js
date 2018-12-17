import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';

import ProfileHead from './Head';
import ProfileBody from './Body';

export class GetUserData extends Component {
    // static propTypes = {

    // }

    state = {
        user: {}
    }

    componentDidMount() {
        fetch(`http://e4cbdfb5.ngrok.io/user/${1}`)
            .then(response => response.json())
            .then(user => {console.log('user', user); this.setState({ user })});
    }
    render() {
        return (
            <View>
                <ProfileHead />
                <ProfileBody />

            </View>
        )
    }
}

export default GetUserData;
