import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from 'native-base';

import ProfileHead from '../components/Profile/Head';
import ProfileBody from '../components/Profile/Body';


class ProfileTab extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <ProfileHead />
                    <ProfileBody />
                </Content>
            </Container >
        );
    }
}
export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});