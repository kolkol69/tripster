import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_APIKEY } from '../../../google.apikey';

export default class TestMap extends Component {
    render() {
        const ORIGIN = this.props.coordinates[0];
        const DESTINATION = this.props.coordinates[this.props.coordinates.length - 1];
        const WAYPOINTS = this.props.coordinates.slice(1, -1);
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    ref={(ref) => { this.mapRef = ref; }}
                    onLayout={() => this.mapRef.fitToCoordinates(this.props.coordinates, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: true })} 
                    initialRegion={{
                        latitude: 50.0646501,
                        longitude: 19.9449799,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {this.setMarkers()}
                    <MapViewDirections
                        origin={ORIGIN}
                        destination={DESTINATION}
                        waypoints={WAYPOINTS}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
            </View>
        )
    }

    setMarkers = () => {
        return this.props.coordinates.map((point, index) => (
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
