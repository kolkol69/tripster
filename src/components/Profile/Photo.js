import React from 'react'
import { View, Image } from "react-native";

/**User photo takes 1/3rd of view horizontally **/
const Photo = () => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <Image source={{ uri: 'https://cdna.artstation.com/p/assets/images/images/001/218/728/large/yuri-shwedoff-warrior-internet.jpg' }}
                style={{ width: 75, height: 75, borderRadius: 37.5 }} />
        </View>
    )
}

export default Photo
