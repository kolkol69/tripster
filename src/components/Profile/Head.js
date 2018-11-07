import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, } from "react-native";
import { Button } from 'native-base';
import Icon from '@expo/vector-icons/AntDesign';

function ProfielHead(props) {
    return (
        <View style={{ paddingTop: 10 }}>
            {/** User Photo Stats**/}
            <View style={{ flexDirection: 'row' }}>
                {/**User photo takes 1/3rd of view horizontally **/}
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image source={{ uri: 'https://cdna.artstation.com/p/assets/images/images/001/218/728/large/yuri-shwedoff-warrior-internet.jpg' }}
                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                </View>
                {/**User Stats take 2/3rd of view horizontally **/}
                <View style={{ flex: 3 }}>
                    {/** Stats **/}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'flex-end'
                        }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>20</Text>
                            <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>205</Text>
                            <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>167</Text>
                            <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                        </View>
                    </View>
                    {/**Edit profile and Settings Buttons **/}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                        <View
                            style={{ flexDirection: 'row' }}>
                            {/** Edit profile takes up 3/4th **/}
                            <Button bordered dark
                                style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>
                            {/** Settings takes up  1/4th place **/}
                            <Button bordered dark style={{
                                flex: 1,
                                height: 30,
                                marginRight: 10, marginLeft: 5,
                                justifyContent: 'center'
                            }}>
                                <Icon name="circledown" size={15} style={{ color: 'black' }}></Icon></Button>
                        </View>
                    </View>{/**End edit profile**/}
                </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Maks Kolodiy</Text>
                    <Text>Student | Dev | Jeez | @kolkol69</Text>
                </View>
            </View>
        </View>
    )
}

ProfielHead.propTypes = {
    
}

export default ProfielHead

