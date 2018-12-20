import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_APIKEY } from '../../../api_key';
const coordinates = [
    {
        latitude: 50.0646501,
        longitude: 19.9449799,
    },
    {
        latitude: 50.1646501,
        longitude: 19.8449799,
    }
];

const waypoints = [
    {
        latitude: 50.0646601,
        longitude: 19.9449599,
    },
    {
        latitude: 50.1246501,
        longitude: 19.7449799,
    }

]
export default class TestMap extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    fitToElements={true}
                    initialRegion={{
                        latitude: 50.0646501,
                        longitude: 19.9449799,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {this.setMarkers()}
                    <MapViewDirections
                        origin={coordinates[0]}
                        destination={coordinates[1]}
                        waypoints={waypoints}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
            </View>
        )
    }

    setMarkers = () => {
        console.log('this.props.coordinates: \n', this.props.coordinates);
        let points = [...coordinates, ...waypoints];
        return points.map((point, index) => (
                <MapView.Marker
                    key={index}
                    coordinate={point}
                    title={'USER 2'}
                    description={'DESCR 2'}
                />
            )
        );
    }
}
