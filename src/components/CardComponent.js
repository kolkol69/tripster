import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
} from "react-native";
import { connect } from 'react-redux';
import { fetchLike } from '../actions/toggleLikeAction';

import TestMap from './Profile/TestMap';
import Card from './CardContainer';

class CardComponent extends Component {

    state = {
        likeActive: false,
        coordinates: [],
        likesAmount: -1,
    }

    componentDidMount(){
        this.setState({
            likeActive: this.props.postDetails.likes.indexOf(this.props.user.id) !== -1,
            likesAmount: this.props.usersData.tours.filter(tour => tour.id == this.props.postDetails.id)[0].likes.filter(like => like != undefined).length,
        });
    }

    render() {
        return (
            <Card {...this.props} likesAmount={this.state.likesAmount} likeActive={this.state.likeActive} loadingLikes={this.props.loading} _renderItem={this._renderItem} getImages={this.getImages} onLikePress={this.onLikePress} autoplay={this.props.autoplay}/>
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
        selectedPosts.places.forEach((place) => { places.images.push(place.image) });

        return places.images;
    }

    onLikePress = (postId) => {
        const addOrRemove = this.state.likeActive ? -1 : 1;
        this.setState({
            likesAmount: this.state.likesAmount + 1*addOrRemove,
            likeActive: !this.state.likeActive,
        });
        this.props.toggleLike();
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

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLike: () => dispatch(fetchLike()),
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.fetchedLikes.loading,
    }   
}

CardComponent.defaultProps = {
    autoplay: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});