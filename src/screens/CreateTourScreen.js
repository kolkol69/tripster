const users = require('../../api/users.json');
const places = require('../../api/places.json')
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Dialog, { DialogButton, DialogTitle, SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { MapView } from 'expo';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList
} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
const api = require('../../api_key.js');
const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

export default class CreateArticleScreen extends Component {
    static navigationOptions = {
        title: 'Create',
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
        }, (err) => { console.log('err', err) });
        /**
         * start tracking
         */
    }
    showStartButton = () => {
        return (
            <View>
                <Button
                    style={{ width: 50, height: 30 }}
                    onPress={this.onPressStart}
                    title="Start"
                    color="#841584"
                />
            </View>
        )
    }
    showButtons = () => {
        return (
            <View>
                <Button
                    style={{ backgroundColor: 'black', width: 50, height: 30 }}
                    onPress={this.onPressAddPOI}
                    title="Stop"
                    color="#841584"
                />
                <Button
                    style={{ width: 50, height: 30 }}
                    onPress={this.onPressAddPOI}
                    title="Add POI"
                    color="#841584"
                />
            </View>
        );
    }
    onPressAddPOI = () => {
        this.setState({ POIList: places.results, showPOIList: true });
    }

    displayPOIList = () => {
        if (Object.keys(this.state.POIList) !== 0) {
            return (
                <FlatList
                    data={this.state.POIList}
                    renderItem={({ item }) => <Button onPress={() => this.setState({ showPOIForm: true })} title={item.name} />}
                />
            );
        } else {
            return (
                <Text>kocham cie zachara</Text>
            );
        }
    }

    displayPOIForm = () => {
        // this.setState({ showPOIList: false });
        if (this.state.showPOIForm) {
            return (
                <View>
                    <Text>FUCK</Text>
                    <Button
                        title={'press me plz ;____;'}
                        onPress={()=>this.setState({ showPOIForm: false })}
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
            this.setState({ location, userLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude } });
        });
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
                <MapView
                    style={{ flex: 1 }}
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
                                coordinate={{ latitude: place.location.lat, longitude: place.location.lng, }}
                                title={place.name}
                                description={place.description}
                            />
                        )
                    })}
                    <MapView.Marker
                        coordinate={typeof this.state.userLocation.latitude == 'undefined' ? {} : { latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude }}
                        title={'USER'}
                        description={'DESCR'}
                    />

                    <MapViewDirections
                        origin={{ latitude: users[0].tour.places[0].location.lat, longitude: users[0].tour.places[0].location.lng }}
                        // waypoints={users[0].tour.places.slice(1,-1).map(el => {return {latitude: el.location.lat, longitude: el.location.lng}})}
                        destination={{ latitude: users[0].tour.places[6].location.lat, longitude: users[0].tour.places[6].location.lng }}
                        apikey={api.default.key}

                    />

                    <View
                        style={{ bottom: 0 }}
                    >

                        {this.state.start ? this.showButtons() : this.showStartButton()}
                        {this.state.showPOIList && !this.state.showPOIForm ? this.displayPOIList() : <Text>Loading...</Text>}
                        {this.displayPOIForm()}
                    </View>
                </MapView>
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