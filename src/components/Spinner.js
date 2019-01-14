import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'


const Spinner = (props) => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={props.size} color={props.color} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

Spinner.defaultProps = {
    color: '#BDBAB9', 
    size: 'small', // 'small' or 'large'
}

export default Spinner
