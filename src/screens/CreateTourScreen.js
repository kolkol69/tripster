import React, {Component} from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJ7VPaMgmjFU0bPDnnDW97lvGSwBGPwYI",
    authDomain: "tripster-5fc5d.firebaseapp.com",
    databaseURL: "https://tripster-5fc5d.firebaseio.com",
    projectId: "tripster-5fc5d",
    storageBucket: "tripster-5fc5d.appspot.com",
    messagingSenderId: "798900647773"
};

import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Card,
    CardItem,
    Icon,
    Right,
    Body,
    List,
    ListItem,
    Left,
    Thumbnail,
    Label
} from 'native-base';
import {MapView} from 'expo';
import ImagePicker from 'react-native-image-picker';

import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Dimensions,
    TextInput,
    Picker,
    Image
} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const api = 'AIzaSyD24BWV2Ym7i-OpCENpcM76brS3oIPWtlM';
const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

export default class CreateArticleScreen extends Component {
    static navigationOptions = {
        title: 'Create tour'
    };

    state = {
        userLocation: {},
        start: false,
        showNearbyPOIList: false,
        nearbyPOIList: [],
        showPOIForm: false,
        userID: 0, //takie rzeczy powinny byc gdzies w global storze ale narazie niech siedzi tutaj
        currentTourID: 0,
        selectedPOI: {},
        POIToAddName: '',
        POIToAddDescription: '',
        POIToAddRating: '',
        POIToAddImages: [],
        POIToAddLocation: {},
    };

    componentDidMount() {
        this.getCurrPosition();
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
    }

    onPressStart = () => {
        this.setState({start: true});

        navigator.geolocation.watchPosition((currentLocation) => {
            this.setState({
                userLocation: {
                    longitude: currentLocation.coords.longitude,
                    latitude: currentLocation.coords.latitude,
                }
            })
        }, err => console.log('location error', err));

        firebase.database().ref('users/users/' + this.state.userID + '/tours').once('value')
            .then(resp => {
                let tours = resp.val();
                let id = Math.floor(Math.random() * 10000000);
                this.setState({currentTourID: id});

                tours.push({
                    likes: [], //z jakiegos powodu nie mozna pushowac pustych tablic do firebase - pozniej trzeba to sprawdzac
                    startDate: new Date(),
                    endDate: '',
                    id: id,
                    places: [] //z jakiegos powodu nie mozna pushowac pustych tablic do firebase - pozniej trzeba to sprawdzac
                });

                firebase.database().ref('users/users/' + this.state.userID)
                    .update({tours: tours})
                    .then(res => console.log('tours updated', res))
                    .catch(err => console.log('tours updated err', err));
            })
            .catch(err => console.log(err));
    };

    showStartButton = () => {
        return (
            <View style={{
                width: width,
                position: 'absolute',
                bottom: 16,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: 'center',
            }}>
                <Button
                    onPress={this.onPressStart}
                    title="Start"
                />
            </View>
        )
    };

    showButtons = () => {
        return (
            <View style={{
                zIndex: 1,
                width: width,
                position: 'absolute',
                bottom: 16,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: 'center',
            }}>
                <Button
                    onPress={() => this.setState({start: false})}
                    title="Stop"
                />
                <Button
                    onPress={this.onPressAddPOI}
                    title="Add POI"
                />
            </View>
        );
    };

    onPressAddPOI = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.userLocation.latitude},${this.state.userLocation.longitude}&radius=50&key=${api}`)
            .then(resp => resp.json())
            .then(respJson => {
                this.setState({showNearbyPOIList: true});
                respJson.results.slice(0, 10).forEach(place => {
                    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${api}`)
                        .then(placeDetails => placeDetails.json())
                        .then(placeDetailsJson => this.setState({nearbyPOIList: this.state.nearbyPOIList.concat([placeDetailsJson])}))
                        .catch(err => console.log(err))
                })
            }).catch(err => console.log(err));
    };

    displayNearbyPOIList = () => {
        return (
            <View style={{
                zIndex: 2,
                width: width,
                position: 'absolute',
            }}>
                <Container>
                    <Content>
                        <View style={{margin: 32}}>
                            <Button
                                title={'Close'}
                                color={'grey'}
                                onPress={() => this.setState({showNearbyPOIList: false})}>
                            </Button>
                        </View>
                        <View style={{margin: 32}}>
                            <Button
                                title={'Add custom poi'}
                                onPress={() => {
                                    this.setState({showNearbyPOIList: false, showPOIForm: true})
                                }}>
                            </Button>
                        </View>
                        <List>
                            <FlatList
                                data={this.state.nearbyPOIList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <ListItem thumbnail>
                                        <Left>
                                            {item.result.photos ?
                                                <Thumbnail square
                                                           source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.result.photos[0].photo_reference}&key=${api}`}}/>
                                                : <Thumbnail square source={{uri: item.result.icon}}/>
                                            }
                                        </Left>
                                        <Body>
                                        <Text>{item.result.name}</Text>
                                        <Text>{item.result.formatted_address}</Text>
                                        </Body>
                                        <Right>
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
                                        </Right>
                                    </ListItem>}
                            />
                        </List>
                    </Content>
                </Container>
            </View>
        );
    };

    displayPOIForm = () => {
        return (
            <View style={{
                zIndex: 2,
                width: width,
                position: 'absolute',
            }}>
                <Container>
                    <Content>
                        <Form>
                            <Item stackedLabel>
                                <Label>Place name</Label>
                                <Input placeholder={this.state.selectedPOI.name}
                                       onChangeText={(val) => this.setState({POIToAddName: val})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Input onChangeText={(val) => this.setState({POIToAddDescription: val})}/>
                            </Item>
                            <View style={{margin: 16}}>
                                <Text>Rating</Text>
                                <Picker
                                    style={{width: 128}}
                                    onValueChange={(val) => this.setState({POIToAddRating: val})}>
                                    <Picker.Item label="1" value="1"/>
                                    <Picker.Item label="2" value="2"/>
                                    <Picker.Item label="3" value="3"/>
                                    <Picker.Item label="4" value="4"/>
                                    <Picker.Item label="5" value="5"/>
                                    <Picker.Item label="6" value="6"/>
                                </Picker>
                            </View>
                            <View style={{margin: 32}}>
                                <Button
                                    title={'Chose photo'}
                                    onPress={this.showImagePicker}/>
                            </View>
                            <View style={{
                                margin: 32,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                alignContent: 'center',
                            }}>
                                <Button
                                    title={'Close'}
                                    color={'grey'}
                                    onPress={() => this.setState({showPOIForm: false})}>
                                </Button>
                                <Button
                                    title={'Save'}
                                    onPress={this.addPOI}>
                                </Button>
                            </View>
                        </Form>
                    </Content>
                </Container>
            </View>
        );
    };

    showImagePicker = async () => {
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true
        }).catch(err => console.log(err));

        if (!result.cancelled) {
            this.setState({POIToAddImages: this.state.POIToAddImages.concat([{base64: result.base64}])});
        }
    };

    hashCode = (s) => {
        return s.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    };

    addPOI = async () => {
        const poi = {};
        poi.name = this.state.POIToAddName;
        poi.description = this.state.POIToAddDescription;
        poi.rating = this.state.POIToAddRating;
        poi.id = this.hashCode(this.state.POIToAddName);
        poi.location = (this.state.POIToAddLocation ? this.state.POIToAddLocation :
            {lat: this.state.userLocation.latitude, lng: this.state.userLocation.longitude});
        poi.images = this.state.POIToAddImages; // zdjecia w basie sa przechowywane w formacie base64

        firebase.database().ref('users/users/' + this.state.userID + '/tours').once('value')
            .then(resp => {
                let tours = resp.val();
                if (!tours.find(e => e.id === this.state.currentTourID).places)
                    tours.find(e => e.id === this.state.currentTourID).places = [];

                tours.find(e => e.id === this.state.currentTourID).places.push(poi);

                firebase.database().ref('users/users/' + this.state.userID)
                    .update({tours: tours})
                    .then(res => {
                        this.setState({showPOIForm: false});
                        console.log(res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    getCurrPosition = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                userLocation: {latitude: location.coords.latitude, longitude: location.coords.longitude}
            });
        }, err => console.log('Could not access location', err));
    }

    render() {
        if (Object.keys(this.state.userLocation).length === 0) {
            return (
                <View>
                    <Text>
                        Loading..
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={{flex: 1}}
                        initialRegion={{
                            latitude: this.state.userLocation.latitude,
                            longitude: this.state.userLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <MapView.Marker
                            coordinate={typeof this.state.userLocation.latitude === 'undefined' ? {} : {
                                latitude: this.state.userLocation.latitude,
                                longitude: this.state.userLocation.longitude
                            }}
                            title={'USER'}
                            description={'DESCR'}
                        />
                    </MapView>

                    {this.state.start ? this.showButtons() : this.showStartButton()}
                    {this.state.showNearbyPOIList ? this.displayNearbyPOIList() : null}
                    {this.state.showPOIForm ? this.displayPOIForm() : null}
                </View>
            );
        }

    }
}