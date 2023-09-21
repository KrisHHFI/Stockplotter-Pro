import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './Pages/HomePage'
import AddPage from './Pages/AddPage'
import BoardPage from './Pages/BoardPage'
import SettingsPage from './Pages/SettingsPage'
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
            } else if (route.name === 'Cork Board') {
              iconName = 'easel';
            } else if (route.name === 'Settings') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>

        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Add" component={AddPage} />
        <Tab.Screen name="Cork Board" component={BoardPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}