import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get('window');

const test = (index) => {
    console.log('index', index);
}

const Post = props => {
    return (
        // <TouchableOpacity onPress={()=>{test.bind(props.index)}} style={[styles.container, props.index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
        <View style={[styles.container, props.index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
            <Image style={styles.post}
                source={{ uri: `${props.image}` }}>
            </Image>
        </View>
    )
}

Post.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        width: (width) / 3,
        height: (width) / 3,
        marginBottom: 2,
    },
    post: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    }
});

export default Post
