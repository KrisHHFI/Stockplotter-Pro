import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import Page2 from './Page2'
import Page3 from './Page3'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarIconStyle: { display: "none" } }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Page 2" component={Page2} />
        <Tab.Screen name="Page 3" component={Page3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}