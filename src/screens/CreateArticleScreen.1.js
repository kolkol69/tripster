const users = require('../../api/users.json');

import React, { Component } from 'react';
import { MapView } from 'expo';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';

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
    }

    onPressStart = () => {
        console.log('zachara START');
    }
    onPressAddPOI = () => {
        console.log('zachara POI');
    }
    getCurrPosition = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location);
            this.setState({ location });
        });
    }
    componentDidMount() {
        this.getCurrPosition();
        console.log('users: ', users[0].tour.places[0].location.lat, users[0].tour.places[0].location.lng);
        console.log('users typeof: ', typeof users[0].tour.places[0].location.lat, typeof users[0].tour.places[0].location.lng);
    }

    render() {

        if (Object.keys(this.state.location).length === 0) {
            return (
                <View>
                    <Text>
                        Loading..
                </Text>
                </View>
            );
        } else {

            return (
                <View>
                    <MapView
                        style={{ flex: 1,  position:'absolute'}}
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

                        {/* <MapView.Polyline
                        coordinates={users[0].tour.places.map((place)=>{
                            return {
                                latitude: place.location.lat,
                                longitude: place.location.lng,
                            }
                        })}
                        strokeWidth={4}
                    /> */}

                        <MapViewDirections
                            // origin={{latitude: 50, longitude: 18}}
                            // destination={{latitude: 51, longitude: 19}}
                            // origin={{ latitude: 37.3317876, longitude: -122.0054812 }}
                            // destination={`${users[0].tour.places[2].location.lat}, ${users[0].tour.places[2].location.lng}`}

                            origin={{ latitude: users[0].tour.places[0].location.lat, longitude: users[0].tour.places[0].location.lng }}
                            // waypoints={users[0].tour.places.slice(1,-1).map(el => {return {latitude: el.location.lat, longitude: el.location.lng}})}
                            destination={{ latitude: users[0].tour.places[6].location.lat, longitude: users[0].tour.places[6].location.lng }}
                            apikey={'AIzaSyCgfuWPC6I1I6HTD2L9c7OHIk43w82uNIE'}
                        />

                        <View
                            style={{ bottom: 0 }}
                        >
                        </View>
                    </MapView>
                    <Button
                        style={styles.buttons}
                        onPress={this.onPressStart}
                        title="Start"
                        color="#841584"
                    />
                    <Button
                        style={{ position: 'absolute', left: 0 }}
                        onPress={this.onPressAddPOI}
                        title="Add POI"
                        color="#841584"
                    />
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
    buttons: {
        position: 'absolute',
        width: 50,
        height: 30
    }
});