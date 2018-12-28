import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from 'native-base';

import AjaxUserData from '../components/Profile/GetUserData';

class ProfileTab extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <AjaxUserData userId={11111}/>
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