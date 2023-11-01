import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './Pages/HomePage'
import AddPage from './Pages/AddPage'
import BoardPage from './Pages/BoardPage'
import SettingsPage from './Pages/SettingsPage'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import { getLanguage } from './Databases/SettingsDatabase.js';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState("English");

  getLanguage((rows) => { // Sets the page language
    if (rows.length > 0) {
      if (rows[0].language === "English") {
        setCurrentLanguage("English");
      } else {
        setCurrentLanguage("Finnish");
      }
    }
  });

  // Language options
  const text = {
    English: {
      home: "Home",
      add: "Add",
      corkBoard: "Cork Board",
      settings: "Settings",
    },
    Finnish: {
      home: "Koti",
      add: "Lisätä",
      corkBoard: "Korkkimatto",
      settings: "Asetukset",
    }
  };

  return (
    <NavigationContainer>
      {/* Ensures that systems icons aren't hidden by the top bar*/}
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home' || route.name === 'Koti') {
              iconName = 'md-home';
            } else if (route.name === 'Add' || route.name === 'Lisätä') {
              iconName = 'md-add-circle-sharp';
            } else if (route.name === 'Cork Board' || route.name === 'Korkkimatto') {
              iconName = 'easel';
            } else if (route.name === 'Settings' || route.name === 'Asetukset') {
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
        <Tab.Screen name={text[currentLanguage].home}
          component={HomePage}
          listeners={{
            tabPress: () => {
              getLanguage((rows) => {
                if (rows.length > 0) {
                  setCurrentLanguage(rows[0].language);
                }
              });
            },
          }}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name={text[currentLanguage].add}
        component={AddPage}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name={text[currentLanguage].corkBoard}
        component={BoardPage}
        listeners={{
          tabPress: () => {
            getLanguage((rows) => {
              if (rows.length > 0) {
                setCurrentLanguage(rows[0].language);
              }
            });
          },
        }}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
        <Tab.Screen name={text[currentLanguage].settings}
        component={SettingsPage}
        listeners={{
          tabPress: () => {
            getLanguage((rows) => {
              if (rows.length > 0) {
                setCurrentLanguage(rows[0].language);
              }
            });
          },
        }}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            }, headerTintColor: 'gold',
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}