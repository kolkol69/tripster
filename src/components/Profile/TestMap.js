import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import * as firebase from 'firebase';

export default class TestMap extends Component {
    render() {
        // debugger;
        return (
            <View style={{ position: 'relative', flex: 1 }}>
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: 50.0646501,
                        longitude: 19.9449799,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: 50.0646501,
                            longitude: 19.9449799,
                        }}
                        title={'USER'}
                        description={'DESCR'}
                    />
                </MapView>
             </View>
        )
    }
}
