import React from 'react'
import PropTypes from 'prop-types'
import CardComponent from '../CardComponent';
import { View }from 'react-native'
function PostCards(props) {
    return (
        <View>
            <CardComponent imageSource="1" likes="101" />
            <CardComponent imageSource="2" likes="101" />
            <CardComponent imageSource="3" likes="101" />
        </View>
    )
}

PostCards.propTypes = {

}

export default PostCards

