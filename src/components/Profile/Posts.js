import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from "react-native";
import Post from './Post';

const images = [
    'https://cdna.artstation.com/p/assets/images/images/001/496/724/large/yuri-shwedoff-shaman-internet.jpg',
    'https://dspncdn.com/a1/media/692x/b8/ec/d7/b8ecd7dccd8e12d7812ee79575009279.jpg',
    'https://wowxwow.com/wp-content/uploads/2015/08/YShwedoff-Wolf-Pack.jpg',
    'https://tasty-shop.ru/files/images/yshorns.jpg',
    'http://i.widelec.org/3hhd.jpg',
    'https://cdna.artstation.com/p/assets/images/images/001/496/724/large/yuri-shwedoff-shaman-internet.jpg',
    'https://dspncdn.com/a1/media/692x/b8/ec/d7/b8ecd7dccd8e12d7812ee79575009279.jpg',
    'https://wowxwow.com/wp-content/uploads/2015/08/YShwedoff-Wolf-Pack.jpg',
    'https://tasty-shop.ru/files/images/yshorns.jpg',
    'http://i.widelec.org/3hhd.jpg',
    'https://tasty-shop.ru/files/images/yshorns.jpg',
    'http://i.widelec.org/3hhd.jpg',
];

const Posts = props => {
    return (
        <View style={styles.postList}>
            {renderPosts()}
        </View>
    )
}

const renderPosts = () => {
    return images.map((image, index) =>
        <Post key={index} index={index} image={image} />
    )
}

Posts.propTypes = {

}

const styles = StyleSheet.create({
    postList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Posts;
