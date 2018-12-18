import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {

    state = {
        likes: typeof this.props.postDetails.images[0].likes == 'undefined' ? 0 : this.props.postDetails.images[0].likes.length,
        likeActive: false,
        saved: false,
    }

    render() {
        const images = this.props.postDetails.images[0];

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: `${this.props.user.profileImage}` }} />
                        <Body>
                            <Text>{this.props.user.name}</Text>
                            <Text note>{this.props.user.tours[0].startDate}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: images.url }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Text style={{ marginRight: 5 }}>{this.state.likes}</Text>
                        <Button onPress={()=>{this.onLikePress()}} transparent>
                            <Icon name="ios-heart" style={this.state.likeActive ? {color: 'red' } : { color: 'black' }} />
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
                            <Text style={{ fontWeight: "900", marginRight: 5 }}>{this.props.user.name}</Text>
                            <Text> {this.props.postDetails.images[0].description} </Text>
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
    onLikePress = () => {
        console.log('liked');
        this.setState({
            likeActive: !this.state.likeActive,
            likes: this.state.likeActive ? this.state.likes - 1 : this.state.likes + 1,
        });
    }
    // onCommentPress = () => {
    //     this.setState({
    //     });
    // }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});