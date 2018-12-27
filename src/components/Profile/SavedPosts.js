import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';

import { View } from 'react-native';

const SavedPosts = (props) => {
    return (
        <View>
            {findSavedPost(props)}
        </View>
    )
}
const findSavedPost = (props) => {
    return props.savedPostsIDs.map(id => <CardComponent key={id} {...props} postDetails={findSelectedPost(props, id)} />);
}

const findSelectedPost = (props, id) => {
    return props.posts.filter(post => post.id === id)[0];
}

SavedPosts.propTypes = {

}

export default SavedPosts

