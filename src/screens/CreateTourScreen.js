
const users = require('../../api/users.json');
const places = require('../../api/places.json')
import React, {Component} from 'react';
import axios from 'axios';
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
import Dialog, {DialogButton, DialogTitle, SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import {MapView} from 'expo';

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
    Picker
} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const api = 'AIzaSyCgfuWPC6I1I6HTD2L9c7OHIk43w82uNIE';
const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

export default class CreateArticleScreen extends Component {
    static navigationOptions = {
        title: 'Create tour'
    };

    state = {
        location: {},
        userLocation: {},
        start: false,
        showNearbyPOIList: false,
        nearbyPOIList: [],
        showPOIForm: false,
        userID: 0, //takie rzeczy powinny byc gdzie w global storze ale narazie niech siedzi tutaj
        currentTourID: 0,
        POIToAddName: '',
        POIToAddDescription: '',
        POIToAddRating: '',
        POIToAddImages: [],
    }

    componentDidMount() {
        this.getCurrPosition();
    }

    onPressStart = () => {
        this.setState({
            start: true,
        });
        navigator.geolocation.watchPosition((currentLocation) => {
            this.setState({
                userLocation: {
                    longitude: currentLocation.coords.longitude,
                    latitude: currentLocation.coords.latitude,
                }
            })
        }, (err) => {
            console.log('err', err)
        });
        fetch('http://localhost:8873/startTour', {
            method: 'POST',
            body: JSON.stringify({userID: this.state.userID}),
        }).then(res => res.json())
            .then(resJson => {
                console.log('tour started, id: ', resJson);
                this.setState({currentTourID: resJson.tourID})
            }).catch(err => console.log(err));

    }
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
                    style={{width: 50, height: 30}}
                    onPress={this.onPressStart}
                    title="Start"
                    color="#841584"
                />
            </View>
        )
    }
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
                    style={{width: 80, height: 30}}
                    onPress={() => this.setState({start: false})}
                    title="Stop"
                    color="#841584"
                />
                <Button
                    style={{width: 80, height: 30}}
                    onPress={this.onPressAddPOI}
                    title="Add POI"
                    color="#841584"
                />
            </View>
        );
    }

    onPressAddPOI = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.userLocation.latitude},${this.state.userLocation.longitude}&radius=2137&key=${api}`)
            .then(resp => resp.json())
            .then(respJson => this.setState({nearbyPOIList: respJson.results, showNearbyPOIList: true}));
    };

    displaynearbyPOIList = () => {
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
                                    this.displayPOIForm('custom', null);
                                    this.setState({showNearbyPOIList: false, showPOIForm: true});
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
                                            {item.photos ?
                                                <Thumbnail square
                                                           source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${api}`}}/>
                                                : <Thumbnail square source={{uri: item.icon}}/>
                                            }
                                        </Left>
                                        <Body>
                                        <Text>{item.name}</Text>
                                        </Body>
                                        <Right>
                                            <Button title={'Add'} onPress={() => {
                                                this.displayPOIForm('selected', item.id);
                                                this.setState({showNearbyPOIList: false, showPOIForm: true});
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
    }

    displayPOIForm = (type, placeID) => {
        if (type === 'custom') {
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
                                    onPress={() => this.setState({showPOIForm: false})}>
                                </Button>
                            </View>
                            <Form>
                                <Item stackedLabel>
                                    <Label>Place name</Label>
                                    <Input onChangeText={(val) => this.setState({POIToAddName: val})}/>
                                </Item>
                                <Item stackedLabel>
                                    <Label>Description</Label>
                                    <Input onChangeText={(val) => this.setState({POIToAddDescription: val})}/>
                                </Item>
                                <Picker
                                    selectedValue={'0'}
                                    onValueChange={(val) => this.setState({POIToAddRating: val})}>
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                </Picker>
                            </Form>
                            <View style={{margin: 32}}>
                                <Button
                                    title={'Save'}
                                    onPress={this.addPOI}>
                                </Button>
                            </View>
                        </Content>
                    </Container>
                </View>
            );
        } else {
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
                                    onPress={() => this.setState({showPOIForm: false})}>
                                </Button>
                            </View>
                            <Form>
                                <Item stackedLabel>
                                    <Label>Place name</Label>
                                    <Input onChangeText={(val) => this.setState({POIToAddName: val})}/>
                                </Item>
                                <Item stackedLabel>
                                    <Label>Description</Label>
                                    <Input onChangeText={(val) => this.setState({POIToAddDescription: val})}/>
                                </Item>
                                <Picker
                                    selectedValue={'0'}
                                    onValueChange={(val) => this.setState({POIToAddRating: val})}>
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                </Picker>
                            </Form>
                            <View style={{margin: 32}}>
                                <Button
                                    title={'Save'}
                                    onPress={this.addPOI}>
                                </Button>
                            </View>
                        </Content>
                    </Container>
                </View>
            );
        }
    };

    addPOI = () => {
        fetch('http://localhost:8873/addPOI', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tourID: this.state.currentTourID,
                POIToAddName: this.state.POIToAddName,
                POIToAddDescription: this.state.POIToAddDescription,
                POIToAddRating: this.state.POIToAddRating,
                POIToAddImages: this.state.POIToAddImages,
            }),
        }).then(res => res.json())
            .then(resJson => {
                //trzeba dodac poi na mapie i narysowac trase - do zrobienia
                console.log(resJson)
            })
            .catch(err => console.log(err));
    }

    getCurrPosition = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            // console.log('location', location);
            this.setState({
                location,
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
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {users[0].tour.places.map((place, i) => {
                            return (
                                <MapView.Marker
                                    key={i}
                                    coordinate={{latitude: place.location.lat, longitude: place.location.lng,}}
                                    title={place.name}
                                    description={place.description}
                                />
                            )
                        })}
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
                    {this.state.showNearbyPOIList ? this.displaynearbyPOIList() : null}
                    {this.state.showPOIForm ? this.displayPOIForm() : null}
                </View>
            );
        }

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