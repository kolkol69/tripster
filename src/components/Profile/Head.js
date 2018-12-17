import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from "react-native";
import ProfileButtons from './Buttons';
import ProfileStats from './Stats';
import ProfileDescription from './Description';
import ProfilePhoto from './Photo';

const Head = (props) => {
    const _followers = props.user.followers;
    const _following = props.user.following;
    const _profileImg = props.user.profileImage;
    const _profileDescription = props.user.profileDescription;
    const _username = props.user.name;
    const _posts = props.user.tours[0].places;
    return (
        <View style={styles.head}>
            <View style={styles.info}>
                <ProfilePhoto profilePhoto={_profileImg} />
                <View style={styles.stats}>
                    <ProfileStats followers={_followers} following={_following} posts={_posts.length}/>
                    <ProfileButtons />
                </View>
            </View>
            <View style={styles.description}>
                <ProfileDescription name={_username} description={_profileDescription}/>
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

