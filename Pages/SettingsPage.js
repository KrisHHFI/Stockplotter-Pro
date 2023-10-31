import { Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import { initThemeTable, initLanguageTable, getTheme, getLanguage, toggleTheme, toggleLanguage } from '../Databases/SettingsDatabase.js';
import SettingsPageStyles from '../Stylesheets/LightTheme/SettingsPageStyles.js';

export default function SettingsPage() {

  let [switchicon, setSwitchIcon] = useState("lightbulb-on");
  let [englishButtonState, setEnglishButtonState] = useState("");
  let [finnishButtonState, setFinnishButtonState] = useState("");
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
        console.log(rows); // Theme printed to screen
      });

      getLanguage((rows) => { // Sets the appearance of the language buttons, when page loads.
        if (rows.length > 0) {
          if (rows[0].language === "English") {
            setEnglishButtonState("activeButton");
            setFinnishButtonState("inactiveButton");
          } else {
            setEnglishButtonState("inactiveButton");
            setFinnishButtonState("activeButton");
          }
        }
        console.log(rows); // Language printed to screen
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
        setEnglishButtonState("activeButton");
        setFinnishButtonState("inactiveButton");
      }
    });
  };

  const finnishButtonPressed = () => {
    getLanguage((rows) => {
      const currentLanguage = rows[0].language;
      if (currentLanguage !== "Finnish") {
        toggleLanguage("Finnish");
        setEnglishButtonState("inactiveButton");
        setFinnishButtonState("activeButton");
      }
    });
  };

  return (
    <View style={SettingsPageStyles.container}>

      <View style={SettingsPageStyles.segment}>
        <Text style={SettingsPageStyles.segmentText}>Tutorial</Text>
        <Ionicons.Button name="link" style={SettingsPageStyles.segmentButton} onPress={() => Linking.openURL('https://www.google.com/')} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text style={SettingsPageStyles.segmentText}>Theme</Text>
        <MaterialCommunityIcons.Button name={switchicon} style={SettingsPageStyles.segmentButton} onPress={themeButtonPressed} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text style={SettingsPageStyles.segmentText}>Language</Text>
        <View>
          <Pressable style={SettingsPageStyles[englishButtonState]} onPress={englishButtonPressed}>
            <Text style={SettingsPageStyles.buttonFont}>English</Text>
          </Pressable>

          <Pressable style={SettingsPageStyles[finnishButtonState]} onPress={finnishButtonPressed}>
            <Text style={SettingsPageStyles.buttonFont}>Finnish</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}