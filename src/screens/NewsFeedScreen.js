import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import { MapView } from 'react-native'
import TestMap from '../components/Profile/TestMap';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';


const instructions = Platform.select({
    ios: 'shake for dev menu',
    android: 'Shake or press menu button for dev menu',
});

export default class NewsFeedScreen extends Component {
    static navigationOptions = {
        title: 'News Feed',
    };

    render() {
        return (
            <Container>
                <Header style={{height: 100}}>
                    <Title>TEST</Title>
                </Header>

                    {/* <TestMap/> */}

                <Footer style={{height: 100}}>
                    <FooterTab>
                        <Button transparent>
                            <Icon name='ios-call' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#4F6D7A',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: 5,
    },
});