import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from "react-native";
import ProfileButtons from './Buttons';
import ProfileStats from './Stats';
import ProfileDescription from './Description';
import ProfilePhoto from './Photo';

const Head = (props) => {
    return (
        <View style={styles.head}>
            <View style={styles.info}>
                <ProfilePhoto />
                <View style={styles.stats}>
                    <ProfileStats />
                    <ProfileButtons />
                </View>
            </View>
            <View style={styles.description}>
                <ProfileDescription/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        paddingTop: 10,
    },
    info: {
        flexDirection: 'row',
    },
    stats: {
        flex: 3,
    },
    description: {
        paddingBottom: 10,
    }
});

Head.propTypes = {

}

export default Head

