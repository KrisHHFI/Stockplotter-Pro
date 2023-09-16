import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import styles from './Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import { initThemeTable, getTheme, toggleTheme } from './SettingsDatabase.js';

export default function Page4() {

  let [switchicon, setSwitchIcon] = useState("lightbulb-on");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      initThemeTable();
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

  return (
    <View style={styles.container}>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text>Tutorial</Text>
        <Ionicons.Button name="link" size={24} color="black" onPress={() => Linking.openURL('https://www.google.com/')} />
      </View>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text>Theme</Text>
        <MaterialCommunityIcons.Button name={switchicon} size={24} color="black" onPress={themeButtonPressed} />
      </View>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text>Language</Text>
        <Button title="English" />
        <Button title="Suomi" />
      </View>

      <Text>About</Text>
      <Text>This app was created in 2023 by Kristopher Pepper. The app started out as a school project but...</Text>
    </View>
  );
}