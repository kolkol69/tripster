import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, } from "react-native";
import ProfileButtons from './Buttons';
import ProfileStats from './Stats';
import ProfileDescription from './Description';
import ProfilePhoto from './Photo';

const Head = (props) => {
    return (
        <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <ProfilePhoto />
                <View style={{ flex: 3 }}>
                    <ProfileStats />
                    <ProfileButtons />
                </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
                <ProfileDescription/>
            </View>
        </View>
    )
}

Head.propTypes = {

}

export default Head

