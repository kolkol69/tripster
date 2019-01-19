import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import { MapView } from 'react-native'
import TestMap from '../components/Profile/TestMap';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';


import * as firebase from 'firebase';


import key from '../../api/firebase_apikey.js';

import ProfilePostCards from '../components/Profile/PostCards';

// Initialize Firebase
var firebaseConfig = {
    apiKey: key,
    authDomain: "tripster2-0.firebaseapp.com",
    databaseURL: "https://tripster2-0.firebaseio.com",
    projectId: "tripster2-0",
    storageBucket: "tripster2-0.appspot.com",
    messagingSenderId: "1058324113756"

};


const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

export default class NewsFeedScreen extends Component {
    static navigationOptions = {
        title: 'News Feed',
    };

    state = {
        userid: 11111,
        users: [],
        ready: false
    }

    getUserPosts = () => {
        this.setState({ posts: [] });
        firebase.database().ref('/users/users/').orderByChild('id').equalTo(this.state.userid).once('value')
            .then(resp => {
                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                    this.setState({ users: [] }); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display users
                }
                else {
                    var following = resp.val()[0].following.filter(usr => usr != undefined);
                    var tourArray = [];
                    for (let i = 0; i < following.length; i++) {
                        firebase.database().ref('/users/users/').orderByChild('id').equalTo(following[i]).once('value')
                            .then(resp => {
                                //console.log(resp.val());
                                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                                } else {
                                    var followed = Object.values(resp.val())[0];
                                    tourArray.push(followed);
                                    this.setState({ users: tourArray, ready: true });
                                }
                            });
                    }
                }
            });
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.getUserPosts();

    }


    dispPosts = () => {
        console.log('>>>>>> ', ...this.state.users);
        return (this.state.users.map(element => <ProfilePostCards user={element} posts={element.tours} />));
    }

    render() {
        return (
            // <ScrollView >
            //     <View>
            //         {/* {this.state.ready && this.state.users[0].tours[0] ? this.dispPosts() : <Text>no posts</Text>} */}

            //     </View>
            // </ScrollView>

            <ScrollView >
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#4F6D7A"
                    />
                    <Text style={styles.welcome}>
                        No new posts to show
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: 5,
    },
});