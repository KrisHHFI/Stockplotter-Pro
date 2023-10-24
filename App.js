import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './Pages/HomePage'
import AddPage from './Pages/AddPage'
import BoardPage from './Pages/BoardPage'
import SettingsPage from './Pages/SettingsPage'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Ensures that systems icons aren't hidden by the top bar*/}
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Add') {
              iconName = 'md-add-circle-sharp';
            } else if (route.name === 'Cork Board') {
              iconName = 'easel';
            } else if (route.name === 'Settings') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Styling
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gold',
          tabBarActiveBackgroundColor: 'gold',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 2,
            borderTopColor: 'black',
          },
        })}>
        <Tab.Screen name="Home" component={HomePage}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name="Add" component={AddPage}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name="Cork Board" component={BoardPage}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name="Settings" component={SettingsPage}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}