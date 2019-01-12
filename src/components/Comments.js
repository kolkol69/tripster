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
                {/* {this.commentInput()} */}
            </View>
        )
    }
    // commentInput = () => {
    //     return (
    //         <TextInput
    //             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    //             onChangeText={(comment) => this.setState({ comment })}
    //             value={this.state.comment}
    //         />
    //     );
    // }
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