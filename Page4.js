import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import styles from './Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Page4() {

  let [theme, setTheme] = useState("Light");
  let [switchicon, setSwitchIcon] = useState("lightbulb-on");

  const themeButtonPressed = () => {
    if (theme === "Light") {
      setTheme("Dark");
      setSwitchIcon("lightbulb-off");
    } else {
      setTheme("Light");
      setSwitchIcon("lightbulb-on");
    }
  }

  return (
    <View style={styles.container}>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text>Tutorial</Text>
        <Ionicons.Button name="link" size={24} color="black" />
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