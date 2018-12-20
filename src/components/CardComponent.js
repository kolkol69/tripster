import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import Carousel from './Carousel';
import { connect } from 'react-redux';
import { likePost, dislikePost } from '../actions/likeAction';

import TestMap from './Profile/TestMap';

// import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import Card from './CardContainer';

class CardComponent extends Component {

    state = {
        likeActive: false,
        saved: false,
    }

    render() {
        const { height, width } = Dimensions.get('window');
        // const { profileImage, name } = this.props.user;
        // const sliderWidth = width;
        // const itemWidth = width - 60;

        return (
            <Card {...this.props} _renderItem={this._renderItem} getImages={this.getImages} onLikePress={this.onLikePress} likeActive={this.state.likeActive}/>
        );
    }
    _renderItem = ({ item, index }) => {

        if (index == 0) {
            return item();
        } else {
            return (
                <View style={styles.slide}>
                    <Image source={{ uri: item.url }} style={{ height: 300, width: null, flex: 1 }} />
                </View>
            );
        }

    }
    getImages = () => {
        let places = [];
        places.images = [];
        let selectedPosts = this.props.postDetails;

        places.images.push(() => <TestMap />)
        selectedPosts.images.forEach((img) => { places.images.push(img) });

        return places.images;
    }

    onLikePress = () => {
        this.setState({
            likeActive: !this.state.likeActive,
        });
        this.state.likeActive ? this.props.dislikePost() : this.props.likePost();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        likePost: () => dispatch(likePost()),
        dislikePost: () => dispatch(dislikePost()),
    }
}
function mapStateToProps(state) {
    return {
        likes: state.likes.likes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});