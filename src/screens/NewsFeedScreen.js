import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

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
        console.log("getting posts");
        console.log(this.state.userid);
        this.setState({ posts: [] });
        firebase.database().ref('/users/users/').orderByChild('id').equalTo(this.state.userid).once('value')
            .then(resp => {
                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                    this.setState({ users: [] }); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display users
                }
                else {
                    var user = resp.val()[0];
                    console.log(user.following);
                    var tourArray = [];                
                    for (let i = 0; i < user.following.length; i++) {
                        console.log(user.following[i])
                        firebase.database().ref('/users/users/').orderByChild('id').equalTo(user.following[i]).once('value')
                            .then(resp => {
                                console.log("in resp");
                                //console.log(resp.val());
                                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                                    console.log("no response"); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display users
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
        //this.setState({ userid: 11111 });
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.getUserPosts();

    }


    dispPosts = () => {
        return (this.state.users.map(element => <ProfilePostCards user={element} posts={element.tours} />));
    }

    render() {
        return (
            <ScrollView >
                <View>
                    {this.state.ready ? this.dispPosts() : <Text>no posts</Text>}
                </View>
            </ScrollView>
        );
    }
}

    /*
    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#4F6D7A"
                    />
                    <Text style={styles.welcome}>
                        News Feed are commin
                    </Text>
                    <Text style={styles.instructions}>
                        News Feed are commin
                    </Text>
                    <Text style={styles.instructions}>
                        {instructions}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A',
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