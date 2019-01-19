import React, { Component } from 'react';


import * as firebase from 'firebase';


import key from '../../api/firebase_apikey.js' ;

// Initialize Firebase
var firebaseConfig = {
    apiKey: key,
    authDomain: "tripster2-0.firebaseapp.com",
    databaseURL: "https://tripster2-0.firebaseio.com",
    projectId: "tripster2-0",
    storageBucket: "tripster2-0.appspot.com",
    messagingSenderId: "1058324113756"

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

import AjaxUserData from '../components/Profile/GetUserData';

const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

var width = Dimensions.get('window').width; //full width

//checks whether needed tour parameters exist
function tourCheck(tour) {
    if (tour.places != undefined &&
        tour.places[0] != undefined &&
        tour.places[0].image != undefined &&
        tour.places[0].image.url != undefined &&
        tour.places[0].image.url != null) return true;
    else return false;
}




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
        userProfile: false,
        selectedUserId: -1
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }




    searchForUsers = () => {
        this.setState({ elements: [], loading: true });
        //get users from database and set 'elements' accordingly
        firebase.database().ref('/users/users/').orderByChild('name').equalTo(this.state.text).once('value')
            .then(resp => {//this makes it so users are set to be displayed and not tours
                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                    this.setState({ elements: [], tours: false, users: true, userProfile: false, loading: false }); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display tours
                }
                else this.setState({ elements: Object.values(resp.val()), tours: false, users: true, userProfile: false, loading: false });
            });
    }




    searchForTours = () => {
        this.setState({ elements: [], loading: true });
        //get users from database and set 'elements' accordingly
        firebase.database().ref('/users/users/').once('value') //.orderByChild('tours/name').equalTo(this.state.text).once('value')
            .then(resp => {
                var toursArray = []; // temporary array for fitting tours
                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                    this.setState({ elements: toursArray, tours: true, users: false, userProfile: false, loading: false }); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display tours
                }
                else {
                    user_array = Object.values(resp.val());// response value into array
                    for (let user = 0; user < user_array.length; user++) {
                        if (user_array[user].tours != null && user_array[user].tours != undefined) {// checks whether user has any tours
                            tour_array = Object.values(user_array[user].tours);// tours of given user into array
                            for (let tour = 0; tour < tour_array.length; tour++) {
                                if (tourCheck(tour_array[tour]) && tour_array[tour].name == this.state.text) {//checks whether needed parameters of tour exist and whether tour name matches the query
                                    // pushes object containing user name, tour name, profile image(image of first place) and tour id of matching tour
                                    toursArray.push({ name: user_array[user].name, tourName: tour_array[tour].name, profileImage: tour_array[tour].places[0].image.url, tourId: tour_array[tour].id });
                                }
                            }
                        }
                    }
                    
                    this.setState({ elements: toursArray, tours: true, users: false, userProfile: false, loading: false }); // sets 'elements' array with matching tours, sets display parameters to display tours

                }
                
            });
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



    dispUserProfile = () => {
        console.log("userprof")
        return (
            <View style={{
                zIndex: 2,
                width: width,
                top: 100,
                position: 'absolute',
            }}>
            <Container style={styles.container}>
                <Content>
                    <AjaxUserData userId={this.state.selectedUserId} />
                </Content>
                </Container >
            </View>
        );
    }

     /*
    selectUser = (userId) => {
        this.setState({ tours: false, users: false, loading: false, userProfile: false, selectedUserId: userId });
        
    }
    */

    /*
     <Button title={'Add'}
                                                    onPress={() => {
                                                        this.setState({
                                                            showNearbyPOIList: false,
                                                            showPOIForm: true,
                                                            selectedPOI: item.result,
                                                            POIToAddLocation: item.result.geometry.location
                                                        });
                                                    }}>
                                            </Button>
     * */

    //<Icon name="arrow-forward" />

    dispUserList = () => {
        if (!Array.isArray(this.state.elements) || !this.state.elements.length) {
            return (
                <Text style={{
                    textAlign: "center",
                    top: 65
                }}
                >
                    No matching profiles
                </Text>
            );
        }
        else {
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
                                    keyExtractor={(item, index) => index.toString()}
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
                                                <Button title={'Show'}
                                                    onPress={() => {
                                                        console.log("pressed");
                                                        this.setState({ tours: false, users: false, loading: false, userProfile: true, selectedUserId: item.userId });
                                                    }}>
                                                </Button>
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



    dispTourList = () => {
        
        if (!Array.isArray(this.state.elements) || !this.state.elements.length) {
            return (
                <Text style={{
                    textAlign: "center",
                    top: 65
                }}
                >
                    No matching tours
                </Text>
            );
        }
        else {
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
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: item.profileImage }} />
                                            </Left>
                                            <Body>
                                                <Text>{item.tourName}</Text>
                                                <Text note>{item.name}</Text>
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
            {this.state.users ? this.dispUserList() : (this.state.tours ? this.dispTourList() : (this.state.userProfile ? this.dispUserProfile() : this.state.loading && <Spinner />))}

        </View>
        );

    }
}


/*
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
*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});