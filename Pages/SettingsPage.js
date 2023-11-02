// Table functions
import { initThemeTable, initLanguageTable, getTheme, getLanguage, toggleTheme, toggleLanguage } from '../Databases/SettingsDatabase.js';
// Themes
import SettingsPageStyles from '../Stylesheets/LightTheme/SettingsPageStyles.js';
import SettingsPageStylesDark from '../Stylesheets/DarkTheme/SettingsPageStylesDark.js';
// Page objects
import { Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// React functionality
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';

export default function SettingsPage() {
  const isFocused = useIsFocused();
  // Page objects
  let [switchicon, setSwitchIcon] = useState("lightbulb-on");
  let [englishButtonState, setEnglishButtonState] = useState("");
  let [finnishButtonState, setFinnishButtonState] = useState("");
  // Theme and language default values
  const [themeStyles, setThemeStyles] = useState(SettingsPageStyles);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  // Language options
  const text = {
    English: {
      tutorial: "Tutorial",
      theme: "Theme",
      language: "Language",
    },
    Finnish: {
      tutorial: "Opetusvideo",
      theme: "Teema",
      language: "Kieli",
    }
  };
  // called whenever the screen is loaded
  useEffect(() => {
    if (isFocused) {
      initThemeTable();
      initLanguageTable();
      console.log("Settings page active");
      // Sets the page theme
      getTheme((rows) => {
        if (rows.length > 0) {
          if (rows[0].theme === "Light") { 
            setSwitchIcon("lightbulb-on");
            setThemeStyles(SettingsPageStyles);
          } else {
            setSwitchIcon("lightbulb-off");
            setThemeStyles(SettingsPageStylesDark);
          }
        }
        console.log(rows); // Theme printed to screen
      });
      // Sets the page language
      getLanguage((rows) => {
        if (rows.length > 0) {
          if (rows[0].language === "English") {
            setEnglishButtonState("activeButton");
            setFinnishButtonState("inactiveButton");
            setCurrentLanguage("English");
          } else {
            setEnglishButtonState("inactiveButton");
            setFinnishButtonState("activeButton");
            setCurrentLanguage("Finnish");
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
        toggleTheme("Dark"); // Change in the table
        setSwitchIcon("lightbulb-off");
        setThemeStyles(SettingsPageStylesDark);
      } else {
        toggleTheme("Light"); // Change in the table
        setSwitchIcon("lightbulb-on");
        setThemeStyles(SettingsPageStyles);
      }
    });
  };

  const englishButtonPressed = () => {
    getLanguage((rows) => {
      const currentLanguage = rows[0].language;
      if (currentLanguage !== "English") {
        toggleLanguage("English"); // Change in the table
        setCurrentLanguage("English");
        setEnglishButtonState("activeButton");
        setFinnishButtonState("inactiveButton");
      }
    });
  };

  const finnishButtonPressed = () => {
    getLanguage((rows) => {
      const currentLanguage = rows[0].language;
      if (currentLanguage !== "Finnish") {
        toggleLanguage("Finnish"); // Change in the table
        setCurrentLanguage("Finnish");
        setEnglishButtonState("inactiveButton");
        setFinnishButtonState("activeButton");
      }
    });
  };

  return (
    <View style={themeStyles.container}>

      <View style={themeStyles.segment}>
        <Text style={themeStyles.segmentText}>{text[currentLanguage].tutorial}</Text>
        <Ionicons.Button name="link" style={themeStyles.segmentButton} onPress={() => Linking.openURL('https://www.google.com/')} />
      </View>

      <View style={themeStyles.segment}>
        <Text style={themeStyles.segmentText}>{text[currentLanguage].theme}</Text>
        <MaterialCommunityIcons.Button name={switchicon} style={themeStyles.segmentButton} onPress={themeButtonPressed} />
      </View>

      <View style={themeStyles.segment}>
        <Text style={themeStyles.segmentText}>{text[currentLanguage].language}</Text>
        <View>
          <Pressable style={themeStyles[englishButtonState]} onPress={englishButtonPressed}>
            <Text style={themeStyles.buttonFont}>English</Text>
          </Pressable>
          <Pressable style={themeStyles[finnishButtonState]} onPress={finnishButtonPressed}>
            <Text style={themeStyles.buttonFont}>Suomi</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}