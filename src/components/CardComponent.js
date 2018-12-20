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

        places.images.push(() => <TestMap {...this.props} places={this.props.user.tours[0].places} coordinates={()=>this.mapLocationsToArray()} />)
        selectedPosts.images.forEach((img) => { places.images.push(img) });

        return places.images;
    }

    onLikePress = () => {
        this.setState({
            likeActive: !this.state.likeActive,
        });
        this.state.likeActive ? this.props.dislikePost() : this.props.likePost();
        this.mapLocationsToArray();
    }

    mapLocationsToArray = () => {
        const locationsArray = this.props.user.tours[0].places.map((place)=> {
            return {
                latitude: place.location.lat,
                longitude: place.location.lng,
            }
        });
        return locationsArray;
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