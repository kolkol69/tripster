import React from 'react'
import { View, Text } from "react-native";

/**User Stats take 2/3rd of view horizontally **/
const Stats = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end'
            }}>
            <View style={{ alignItems: 'center' }}>
                <Text>20</Text>
                <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text>205</Text>
                <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text>167</Text>
                <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
            </View>
        </View>
    )
}

export default Stats
