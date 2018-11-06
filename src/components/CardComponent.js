import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {

    render() {

        const images = {

            "1": 'https://cdna.artstation.com/p/assets/images/images/001/496/724/large/yuri-shwedoff-shaman-internet.jpg',
            "2": 'https://dspncdn.com/a1/media/692x/b8/ec/d7/b8ecd7dccd8e12d7812ee79575009279.jpg',
            "3": 'https://wowxwow.com/wp-content/uploads/2015/08/YShwedoff-Wolf-Pack.jpg'
        }

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://cdna.artstation.com/p/assets/images/images/001/218/728/large/yuri-shwedoff-warrior-internet.jpg'}} />
                        <Body>
                            <Text>kolodiy </Text>
                            <Text note>Jan 15, 2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: `${images[this.props.imageSource]}`}} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="ios-heart" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send" style={{ color: 'black' }} />
                        </Button>


                    </Left>
                </CardItem>

                <CardItem style={{ height: 20 }}>
                    <Text>{this.props.likes} likes</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>kolodiy </Text>
                            Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});