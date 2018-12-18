import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import ProfileHead from './Head';
import ProfileBody from './Body';

import Spinner from '../Spinner';

export class GetUserData extends Component {
    // static propTypes = {

    // }

    state = {
        user: {}
    }

    componentDidMount() {
        fetch(`http://556c7787.ngrok.io/user/${2}`)
            .then(response => response.json())
            .then(user => this.setState({ user }));
    }
    render() {
        if (Object.keys(this.state.user).length !== 0) {

            return (
                <View>
                    <ProfileHead user={this.state.user}/>
                    <ProfileBody user={this.state.user}/>
                </View>
            )
        }else{
            return (
                <Spinner/>
              )
        }
    }
}

export default GetUserData;
