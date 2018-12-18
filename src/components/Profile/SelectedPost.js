import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';



const SelectedPost = (props) => {
    return (
        <CardComponent {...props} postDetails={findSelectedPost(props)}/>
    )
}

const findSelectedPost = (props) => {
    return props.posts.places.filter(place => place.id === props.postID)[0];
}
SelectedPost.propTypes = {

}

export default SelectedPost

