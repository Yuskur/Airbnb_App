import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/BottomTabs/Profile';
import Trips from '../screens/BottomTabs/Trips';
import Explore from '../screens/BottomTabs/Explore';
import Wishlists from '../screens/BottomTabs/Wishlists';
import Inbox from '../screens/BottomTabs/Inbox';
import LoginScreen from '../screens/Stacks/LoginScreen';
import Resort from '../screens/Stacks/Resort';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation(){
    function MyStack() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={MyTabs} 
            options={{headerShown: false}} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: true}} />
            <Stack.Screen name="Resort" component={Resort} options={{ headerShown: false}} />
            <Stack.Screen name="Explore" component={Explore} />
          </Stack.Navigator>
        );
      }
      function MyTabs(){
        return (
          <Tab.Navigator>
          <Tab.Screen name="Explore" component={Explore} />
          <Tab.Screen name="Wishlists" component={Wishlists} />
          <Tab.Screen name="Trips" component={Trips} />
          <Tab.Screen name="Inbox" component={Inbox} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
        );
      }
    return <NavigationContainer><MyStack /></NavigationContainer>
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 24,
    fontWeight: '600'
  }
})