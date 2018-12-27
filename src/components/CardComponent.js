import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
} from "react-native";
import { connect } from 'react-redux';
import { likePost, dislikePost } from '../actions/likeAction';

import TestMap from './Profile/TestMap';
import Card from './CardContainer';

class CardComponent extends Component {

    state = {
        likeActive: false,
        coordinates: [],
    }

    render() {
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
        const coordinates = this.mapLocationsToArray();

        places.images.push(() => <TestMap {...this.props} places={selectedPosts.places} coordinates={coordinates} />)
        // console.log('>>>>selectedPosts.places', selectedPosts.places);
        selectedPosts.places.forEach((place) => { places.images.push(place.image) });

        return places.images;
    }

    onLikePress = () => {
        this.setState({
            likeActive: !this.state.likeActive,
        });
        this.state.likeActive ? this.props.dislikePost() : this.props.likePost();
    }

    mapLocationsToArray = () => {
        const coordinates = this.props.postDetails.places.map((place)=> {
            return {
                latitude: place.location.lat,
                longitude: place.location.lng,
            }
        });
        return coordinates;
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