import React from 'react'
import { View, Text } from "react-native";

const Description = (props) => {
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
            <Text>{props.description}</Text>
        </View>
    )
}

export default Description
