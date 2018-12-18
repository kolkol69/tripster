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
        props.posts.places.map( place => <CardComponent key={place.id} {...props} postDetails={place} />)
    )
}

PostCards.propTypes = {

}

export default PostCards

