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
        //console.log("did mount");
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // firebase.database().ref('/users/users/').once('value').then(resp => console.log(resp.val()));
    }

    searchForUsers = () => {
        this.setState({ elements: [], loading: true });
        //get users from database and set 'elements' accordingly
        firebase.database().ref('/users/users/').orderByChild('name').equalTo(this.state.text).once('value')
            .then(resp => {//this makes it so users are set to be displayed and not tours
                // console.log('>>>>>resp', resp.val());
                this.setState({ elements: Object.values(resp.val()), tours: false, users: true, loading: false });
            });
    }


    //checks whether needed tour parameters exist
    tourCheck = (tour) => {
        if (tour.places != undefined &&
            tour.places[0] != undefined &&
            tour.places[0].image != undefined &&
            tour.places[0].image.url != undefined &&
            tour.places[0].image.url != null) return false;
        else return true;
    }

    searchForTours = () => {
        this.setState({ elements: [], loading: true });
        //get users from database and set 'elements' accordingly
        firebase.database().ref('/users/users/').once('value') //.orderByChild('tours/name').equalTo(this.state.text).once('value')
            .then(resp => {
                //console.log("inside");
                var toursArray = []; // temporary array for fitting tours
                if (resp.val() == undefined || resp.val() == null) { //checks whether response contains anything
                    //console.log("empty");
                    this.setState({ elements: toursArray, tours: true, users: false, loading: false }); //sets 'elements' array with nothing as nothing has been acquired, sets display parameters to display tours
                }
                else {
                    //console.log("not empty"); 
                    //console.log("check 1st tour id: ", Object.values(resp.val())[0].tours[0].id);
                    user_array = Object.values(resp.val());// response value into array
                    for (let user = 0; user < user_array.length; user++) {
                        if (user_array[user].tours != null && user_array[user].tours != undefined) {// checks whether user has any tours
                            tour_array = Object.values(user_array[user].tours);// tours of given user into array
                            for (let tour = 0; tour < tour_array.length; tour++) {
                                //console.log('>>>>>resp(tour id):', tour_array[tour].id);
                                if (checkTour(tour_array[tour]) && tour_array[tour].name == this.state.text) {//checks whether needed parameters of tour exist and whether tour name matches the query
                                    // pushes object containing user name, tour name, profile image(image of first place) and tour id of matching tour
                                    toursArray.push({ name: user_array[user].name, tourName: tour_array[tour].name, profileImage: tour_array[tour].places[0].image.url, tourId: tour_array[tour].id });
                                }
                            }
                        }
                    }
                    
                    this.setState({ elements: toursArray, tours: true, users: false, loading: false }); // sets 'elements' array with matching tours, sets display parameters to display tours
                    //console.log(this.state.elements);
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



    dispTourList = () => {
        if (this.state.elements == [] || this.state.elements == null) {
            // console.log("sth wrong");
            return (
                <Text style={{
                    top: 45
                }}
                >
                    No matching tours
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
            {this.state.users ? this.dispUserList() : this.state.loading && <Spinner />}
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