import React from 'react'
import { View, Text, StyleSheet } from "react-native";

/**User Stats take 2/3rd of view horizontally **/
const Stats = (props) => {
    return (
        <View
            style={styles.stats}>
            <View style={styles.details}>
                <Text>{props.posts}</Text>
                <Text style={styles.detailsName}>Posts</Text>
            </View>
            <View style={styles.details}>
                <Text>{props.followers}</Text>
                <Text style={styles.detailsName}>Followers</Text>
            </View>
            <View style={styles.details}>
                <Text>{props.following}</Text>
                <Text style={styles.detailsName}>Following</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    details: {
        alignItems: 'center',
    },
    detailsName: {
        fontSize: 10, 
        color: 'grey',
    },

});

export default Stats
