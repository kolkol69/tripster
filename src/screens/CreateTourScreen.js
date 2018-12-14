const users = require('../../api/users.json');
const places = require('../../api/places.json')
import React, {Component} from 'react';
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
    Thumbnail
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
    Dimensions
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
        title: 'Create Tour',
    };

    state = {
        location: {},
        userLocation: {},
        start: false,
        showPOIList: false,
        POIList: [],
        showPOIForm: false,
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
        /**
         * start tracking
         */
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
            .then(respJson => this.setState({POIList: respJson.results, showPOIList: true}));
    };

    displayPOIList = () => {
        return (
            <View style={{
                zIndex: 2,
                width: width,
                position: 'absolute',
            }}>
                <Container>
                    <Content>
                        <List>
                            <FlatList
                                style={{flex: 2}}
                                data={this.state.POIList}
                                renderItem={({item}) =>
                                    <ListItem thumbnail>
                                        <Left>
                                            {item.photos[0] ?
                                                <Thumbnail square
                                                           source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${api}`}}/>
                                                : <Thumbnail square source={{uri: item.icon}}/>
                                            }
                                        </Left>
                                        <Body>
                                        <Text>{item.name}</Text>
                                        <Text>{item.id}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent title={'Add'} onPress={this.displayPOIForm}>
                                            </Button>
                                        </Right>
                                    </ListItem>}
                            />
                        </List>
                            <Button
                                title={'Close'}
                                onPress={() => this.setState({showPOIList: false})}>
                            </Button>
                    </Content>
                </Container>
            </View>
        );
    }

    displayPOIForm = () => {
        // this.setState({ showPOIList: false });
        if (this.state.showPOIForm) {
            return (
                <View>
                    <Text>FUCK</Text>
                    <Button
                        title={'press me plz ;____;'}
                        onPress={() => this.setState({showPOIForm: false})}
                    />
                </View>
            );
        } else {
            <Text>KOKOKO</Text>
        }
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
                    {this.state.showPOIList ? this.displayPOIList() : null}
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