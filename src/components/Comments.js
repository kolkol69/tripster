import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native';

class Comments extends Component {
    state = {
        comment: '',
    }
    render() {
        return (
            <View style={{ marginTop: -5 }}>
                <Text style={{ color: 'lightgrey', marginBottom: 10 }}>Comments:</Text>
                {this.showComments()}
                {this.commentInput()}
            </View>
        )
    }
    commentInput = () => {
        return (
            <TextInput
                style={{ marginTop: 10, height: 25, borderColor: 'lightgray', borderWidth: 1, borderRadius: 15 }}
                onChangeText={(comment) => this.setState({ comment })}
                value={this.state.comment}
            />
        );
    }
    showComments = () => {
        return this.props.postDetails.comments.map((comment, index) => {
            return (
                <View key={index}>
                    <Text style={{ fontWeight: 'bold' }}>UserId: {comment.userId}</Text>
                    <Text>{comment.comment}</Text>
                </View>
            );
        })
    };
}

export default Comments;