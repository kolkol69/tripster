import React, { Component } from 'react';


import * as firebase from 'firebase';

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDJ7VPaMgmjFU0bPDnnDW97lvGSwBGPwYI",
    authDomain: "tripster-5fc5d.firebaseapp.com",
    databaseURL: "https://tripster-5fc5d.firebaseio.com",
    projectId: "tripster-5fc5d",
    storageBucket: "tripster-5fc5d.appspot.com",
    messagingSenderId: "798900647773"
};
import Spinner from '../components/Spinner';
import {
    TextInput,
    FlatList,
    Button,
    Dimensions,
    Form,
    Item,
    Input,
    Label,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';


import {
    Body,
    Left,
    Right,
    Icon,
    ListItem,
    Container,
    Header,
    Content,
    List,
    Thumbnail,
} from 'native-base'

const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

var width = Dimensions.get('window').width; //full width

export default class ExploreScreen extends Component {
    static navigationOptions = {
        title: 'Explore',
    };

    state = {
        elements: [], //contains elements to display
        text: '', //text typed in search bar
        tours: false, //whether or not tours are displayed
        users: false, //whether or not users are displayed
        loading: false,
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // firebase.database().ref('/users/users/').once('value').then(resp => console.log(resp.val()));
    }

    searchForUsers = () => {
        this.setState({ elements: [], loading:true });
        //get users from database and set 'elements' accordingly
        firebase.database().ref('/users/users/').orderByChild('name').equalTo(this.state.text).once('value')
            .then(resp => {//this makes it so users are set to be displayed and not tours
                // console.log('>>>>>resp', resp.val());
                this.setState({ elements: Object.values(resp.val()), tours: false, users: true, loading: false });
            });
    }

    searchForTours = () => {
        //get tours from database and set 'elements' accordingly
        this.setState({ tours: true, users: false }); // this makes it so tours are set to be displayed and not users
    }

    dispSearchForm = () => {
        return (<TextInput
            style={{ height: 40, width: width * 0.8, left: width * 0.1, borderColor: 'gray', borderWidth: 1 }}
            placeholder=' Type here to search for users or tours '
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
        />
        );
    }

    dispSearchButtons = () => {

        return (

            <View style={{
                //zIndex: 1,
                width: width,
                top: 45,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: 'center',
            }}>
                <Button
                    onPress={this.searchForUsers}
                    title="Users"
                />
                <Button
                    onPress={this.searchForTours}
                    title="Tours"
                />
            </View>

        );

    }

    dispUserList = () => {
        if (this.state.elements == [] || this.state.elements == null) {
            // console.log("sth wrong");
            return (
                <Text style={{
                    top: 45
                }}
                >
                    No matching profiles
                </Text>
            );
        }
        else {
            // console.log("list");
            return (
                <View style={{
                    zIndex: 2,
                    width: width,
                    top: 100,
                    position: 'absolute',
                }}>
                    <Container>
                        <Content>
                            <List>
                                <FlatList
                                    data={this.state.elements}
                                    renderItem={({ item }) => (
                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: item.profileImage }} />
                                            </Left>
                                            <Body>
                                                <Text>{item.name}</Text>
                                                <Text note>{item.region}</Text>
                                            </Body>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    )}
                                />
                            </List>
                        </Content>
                    </Container>
                </View>
            );
        }
    }

    render() {
        return (<View>
            {this.dispSearchForm()}
            {this.dispSearchButtons()}
            {this.state.users ? this.dispUserList() : this.state.loading && <Spinner/>}
        </View>
        );

    }
}

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