import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from "react-native";
import ProfileButtons from './Buttons';
import ProfileStats from './Stats';
import ProfileDescription from './Description';
import ProfilePhoto from './Photo';

const Head = (props) => {
    const {followers, following, profileImage, profileDescription, name} = props.user;
    const postsAmount = props.user.tours.length;
    return (
        <View style={styles.head}>
            <View style={styles.info}>
                <ProfilePhoto profilePhoto={profileImage} />
                <View style={styles.stats}>
                    <ProfileStats followers={followers.length} following={following.length} posts={postsAmount}/>
                    <ProfileButtons />
                </View>
            </View>
            <View style={styles.description}>
                <ProfileDescription name={name} description={profileDescription}/>
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
    user: PropTypes.shape({
        followers:PropTypes.array.isRequired,
        following:PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        tours: PropTypes.array.isRequired,
        profileImage: PropTypes.string.isRequired,
        profileDescription: PropTypes.string.isRequired
    }).isRequired
}

export default Head

