import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';

const SelectedPost = (props) => {
    return (
        <CardComponent {...props} postDetails={findSelectedPost(props)} autoplay={true}/>
    )
}

const findSelectedPost = (props) => {
    return props.posts.filter(post => post.id === props.postID)[0];
}
SelectedPost.propTypes = {

}

export default SelectedPost

