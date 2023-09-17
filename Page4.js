import { StyleSheet, Text, View, Button, Alert, TextInput, Pressable } from 'react-native';
import styles from './Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import { initThemeTable, initLanguageTable, getTheme, getLanguage, toggleTheme, toggleLanguage } from './SettingsDatabase.js';
import SettingsPageStyles from './stylesheets/SettingsPageStyles';

export default function Page4() {

  let [switchicon, setSwitchIcon] = useState("lightbulb-on");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      initThemeTable();
      initLanguageTable();
      console.log("Settings page active");

      getTheme((rows) => {
        if (rows.length > 0) {
          if (rows[0].theme === "Light") { // Sets the appearance of the theme button, when page loads.
            setSwitchIcon("lightbulb-on");
          } else {
            setSwitchIcon("lightbulb-off");
          }
        }
        console.log(rows); // Theme printed to screem
      });

      getLanguage((rows) => {
        if (rows.length > 0) {
          if (rows[0].theme === "English") { // Sets the appearance of the theme button, when page loads.
            //setSwitchIcon("lightbulb-on");
          } else {
            //setSwitchIcon("lightbulb-off");
          }
        }
        console.log(rows); // Theme printed to screem
      });

    }
  }, [isFocused]);

  const themeButtonPressed = () => {
    getTheme((rows) => {
      const currentTheme = rows[0].theme;
      if (currentTheme === "Light") {
        toggleTheme("Dark");
        setSwitchIcon("lightbulb-off");
      } else {
        toggleTheme("Light");
        setSwitchIcon("lightbulb-on");
      }
    });
  };

  const englishButtonPressed = () => {
    getLanguage((rows) => {
      const currentLanguage = rows[0].language;
      if (currentLanguage !== "English") {
        toggleLanguage("English");
        //setSwitchIcon("lightbulb-on");
      }
    });
  };

  const finnishButtonPressed = () => {
    getLanguage((rows) => {
      const currentLanguage = rows[0].language;
      if (currentLanguage !== "Finnish") {
        toggleLanguage("Finnish");
        //setSwitchIcon("lightbulb-on");
      }
    });
  };

  return (
    <View style={SettingsPageStyles.container}>

      <View style={SettingsPageStyles.segment}>
        <Text>Tutorial</Text>
        <Ionicons.Button name="link" size={24} color="black" onPress={() => Linking.openURL('https://www.google.com/')} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text>Theme</Text>
        <MaterialCommunityIcons.Button name={switchicon} size={24} color="black" onPress={themeButtonPressed} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text>Language</Text>


        <Pressable style={SettingsPageStyles.expandButton} onPress={englishButtonPressed}>
          <Text style={SettingsPageStyles.buttonFont}>English</Text>
        </Pressable>

        <Pressable style={SettingsPageStyles.expandButton} onPress={finnishButtonPressed}>
          <Text style={SettingsPageStyles.buttonFont}>Finnish</Text>
        </Pressable>
      </View>

      <Text>About</Text>
      <Text>This app was created in 2023 by Kristopher Pepper. The app started out as a school project but...</Text>
    </View>
  );
}