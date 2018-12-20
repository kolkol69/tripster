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

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {

    state = {
        likeActive: false,
        saved: false,
    }

    render() {
        const { height, width } = Dimensions.get('window');
        const { profileImage, name } = this.props.user;
        const sliderWidth = width;
        const itemWidth = width - 60;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: `${profileImage}` }} />
                        <Body>
                            <Text>{this.props.user.name}</Text>
                            <Text note>{this.props.user.tours[0].startDate}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.getImages(this.props)}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                    />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Text style={{ marginRight: 5 }}>{this.props.likes}</Text>
                        <Button onPress={() => { this.onLikePress() }} transparent>
                            <Icon name="ios-heart" style={this.state.likeActive ? { color: 'red' } : { color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send" style={{ color: 'black' }} />
                        </Button>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900", marginRight: 5 }}>{name}</Text>
                            <Text> {this.props.postDetails.images[0].description} </Text>
                        </Text>
                    </Body>
                </CardItem>
            </Card>
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
            // likes: this.state.likeActive ? this.props.likes - 1 : this.props.likes + 1,
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
// export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});