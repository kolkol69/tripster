import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ProfileHead from './Head';
import ProfileBody from './Body';
import { fetchUsers } from '../../actions/fetchUsersAction'

import Spinner from '../Spinner';

export class GetUserData extends Component {
    componentDidMount() {
        this.props.fetchUsers(this.props.userId);
        // console.log('componentDidMount==========>', Object.keys(this.props.usersData));
    }
    render() {
        if (Object.keys(this.props.usersData).length !== 0) {
            return (
                <View>
                    <ProfileHead {...this.props} user={this.props.usersData} />
                    <ProfileBody {...this.props} user={this.props.usersData} />
                </View>
            )
        } else {
            return (
                <Spinner />
            )
        }
    }
}

function mapStateToProps(state) {
    // console.log('>>>STATE:', state.fetchedUsers.loading);
    return {
        usersData: state.fetchedUsers.usersData,
        loading: state.fetchedUsers.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: (userId) => { dispatch(fetchUsers(userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUserData);
