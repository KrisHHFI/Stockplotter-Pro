import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Add') {
              iconName = 'md-add-circle-sharp';
            } else if (route.name === 'Plotter') {
              iconName = 'easel';
            } else if (route.name === 'Settings') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={Page2} />
        <Tab.Screen name="Plotter" component={Page3} />
        <Tab.Screen name="Settings" component={Page4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}