import React from 'react'
import PropTypes from 'prop-types'
import ProfilePosts from './Posts';
import ProfilePostCards from './PostCards';
import ProfileSavedPosts from './SavedPosts';
import {View} from 'react-native';

const ContentSelector = props => {
    return (
        <View >
            {/** Height =width/3 so that image sizes vary according to size of the phone yet remain squares **/}
            {renderSection(props)}
        </View>
    )
}

const renderSection = (props) => {
    switch (props.active) {
        case 0:
            return <ProfilePosts {...props} posts={props.usersPosts}/>
        case 1:
            return <ProfilePostCards {...props} posts={props.usersPosts}/>
        case 2:
            return <ProfileSavedPosts {...props} posts={props.usersPosts}/>
    }
}

ContentSelector.propTypes = {
    active: PropTypes.number.isRequired,
}

export default ContentSelector
