import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';



const SelectedPost = (props) => {
    return (
        <CardComponent {...props} postDetails={findSelectedPost(props)}/>
    )
}

const findSelectedPost = (props) => {
    // console.log('desired card: ',props.posts.places.filter(place => place.id === props.postID)[0].images);
    return props.posts.places.filter(place => place.id === props.postID)[0];
}
SelectedPost.propTypes = {

}

export default SelectedPost

