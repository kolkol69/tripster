import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Entypo';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CreateTourScreen from '../screens/CreateTourScreen';
import ProfileScreen from '../screens/ProfileScreen';

const NewsFeedStack = createStackNavigator({
  News: NewsFeedScreen,
});

NewsFeedStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={'news'}
      size={25}
    />
  ),tabBarOptions: {
    showLabel: false,
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    tabStyle: {}
} 
};

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
});

ExploreStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={'magnifying-glass'}
      size={25}
    />
  ),tabBarOptions: {
    showLabel: false,
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    tabStyle: {}
}
};

const CreateTourStack = createStackNavigator({
  CreateTour: CreateTourScreen,
});

CreateTourStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={'drink'}
      size={25}
    />
  ),
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#F8F8F8',
        inactiveTintColor: '#586589',
        tabStyle: {}
    }
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={'user'}
      size={25}
    />
  ),tabBarOptions: {
    showLabel: false,
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    tabStyle: {}
}
};

export default createBottomTabNavigator({
  NewsFeedStack,
  ExploreStack,
  CreateTourStack,
  ProfileStack,
});
