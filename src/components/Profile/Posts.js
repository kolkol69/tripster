import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Post from './Post';
import SelectedPost from './SelectedPost';

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
        return this.props.posts.map((post, index) =>
            <TouchableOpacity key={post.id} onPress={() => { this.onPressPost(post.id) }}>
                <Post id={post.id} index={index} image={post.places[0].image.url} />
            </TouchableOpacity>
        )
    }
}

Posts.propTypes = {

}

const styles = StyleSheet.create({
    postList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Posts;
