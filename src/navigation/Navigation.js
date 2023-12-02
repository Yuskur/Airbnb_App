import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Stacks/Home';
import Profile from '../screens/BottomTabs/Profile';
import Trips from '../screens/BottomTabs/Trips';
import Explore from '../screens/BottomTabs/Explore';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation(){
    function MyStack() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={MyTabs} 
            options={{headerShown: false}} />
          </Stack.Navigator>
        );
      }
      function MyTabs(){
        return (
          <Tab.Navigator>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Trips" component={Trips} />
          <Tab.Screen name="Explore" component={Explore} />
        </Tab.Navigator>
        );
      }
    return <NavigationContainer><MyStack /></NavigationContainer>
}