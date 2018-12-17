import React from 'react'
import { View, Image, StyleSheet } from "react-native";

/**User photo takes 1/3rd of view horizontally **/
const Photo = (props) => {
    return (
        <View
            style={styles.imgContainer}>
            <Image source={{ uri: 'https://cdna.artstation.com/p/assets/images/images/001/218/728/large/yuri-shwedoff-warrior-internet.jpg' }}
                style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    img: {
        width: 75,
        height: 75,
        borderRadius: 37.5
    }
})

export default Photo;
