import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Post from './Post';
import SelectedPost from './SelectedPost';
import {connect} from 'react-redux';

class Posts extends Component {
    state = {
        selectedPostId: -1,
    }

    render() {
        if (this.state.selectedPostId < 0) {
            return (
                <View style={styles.postList}>
                    {this.renderPosts()}
                </View>
            )

        } else {
            return (
                <SelectedPost {...this.props} postID={this.state.selectedPostId} />
            )
        }
    }
    onPressPost = (selectedPostId) => {
        this.setState({ selectedPostId });
    }
    renderPosts = () => {
        return this.props.posts.places.map((place, index) =>
            <TouchableOpacity key={place.id} onPress={() => { this.onPressPost(place.id) }}>
                <Post id={place.id} index={index} image={place.images[0].url} />
            </TouchableOpacity>
        )
    }
}

// function mapDispatchToProps () {
//     return {

//     }
// }

// function mapStateToProps(){
//     return {
        
//     }
// }

Posts.propTypes = {

}

const styles = StyleSheet.create({
    postList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Posts;
// export default connect(mapDispatchToProps, mapStateToProps)(Posts);
