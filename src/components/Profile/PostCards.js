import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';
import { View } from 'react-native'
function PostCards(props) {
    return (
        <View>
            {showCards(props)}
        </View>
    )
}

const showCards = (props) => {
    return (
        props.posts.map( post => <CardComponent key={post.id} {...props} postDetails={post} />)
    )
}

PostCards.propTypes = {

}

export default PostCards

