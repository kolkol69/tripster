import React from 'react'
import PropTypes from 'prop-types'
import ProfilePosts from './Posts';
import ProfilePostCards from './PostCards';
import ProfileSavedPosts from './SavedPosts';
import ProfileTestScreen from './TestScreen';
import {View} from 'react-native';

const ContentSelector = props => {
    return (
        <View >
            {renderSection(props)}
        </View>
    )
}

const renderSection = (props) => {
    switch (props.active) {
        case 0:
            return <ProfilePosts {...props} posts={props.usersPosts}/>
        case 1:
            return <ProfilePostCards {...props}  posts={props.usersPosts}/>
        case 2:
            return <ProfileSavedPosts {...props} savedPostsIDs={[1710]} posts={props.usersPosts}/>
        case 3:
            return <ProfileSavedPosts {...props} savedPostsIDs={[1711]} posts={props.usersPosts}/>
    }
}

ContentSelector.propTypes = {
    active: PropTypes.number.isRequired,
}

export default ContentSelector
