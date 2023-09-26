import { StyleSheet, Text, View, Button, Alert, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import { initThemeTable, initLanguageTable, getTheme, getLanguage, toggleTheme, toggleLanguage } from '../Databases/SettingsDatabase.js';
import SettingsPageStyles from '../Stylesheets/SettingsPageStyles';

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
        console.log(rows); // Theme printed to screem
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
        <Text>Tutorial</Text>
        <Ionicons.Button name="link" size={24} color="black" onPress={() => Linking.openURL('https://www.google.com/')} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text>Theme</Text>
        <MaterialCommunityIcons.Button name={switchicon} size={24} color="black" onPress={themeButtonPressed} />
      </View>

      <View style={SettingsPageStyles.segment}>
        <Text>Language</Text>

        <Pressable style={SettingsPageStyles[englishButtonState]} onPress={englishButtonPressed}>
          <Text style={SettingsPageStyles.buttonFont}>English</Text>
        </Pressable>

        <Pressable style={SettingsPageStyles[finnishButtonState]} onPress={finnishButtonPressed}>
          <Text style={SettingsPageStyles.buttonFont}>Finnish</Text>
        </Pressable>
      </View>

      <Text>About</Text>
      <Text>This app was created in 2023 by me, Kristopher Pepper. I created the app as a university project, in my final year at
        Haaga-Helia. React Native was the software used to house the project. The project is almost entirely JavaScript,
        apart from a handful of SQL statements.
        {"\n\n"}
        The goal of the app was to enable investors to strategize and plan their market moves. The app enables the user to search
        for companies via a stock market API. Users can also create notes/manually add companies. These items are saved via a local
         SQLite database. There is also a cork board page, which enables the user to create a virtual cork board and map out their 
         companies and notes.
        {"\n\n"}
        The project was not continued after the course. Since, using a stock API which could supply the demands of real users
        would be costly. The project will serve as a portfolio piece and as a personal tool.
      </Text>
    </View>
  );
}