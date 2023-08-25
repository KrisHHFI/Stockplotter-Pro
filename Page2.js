import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");

  const buttonPressed = () => {
    Alert.alert("You searched", searchinput)
  }


  return (
    <View style={styles.container}>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TextInput placeholder="Company ticker.." style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={searchinput => setSearchinput(searchinput)}
        />
        <Ionicons.Button name="search" size={24} color="black" onPress={buttonPressed} />
      </View>

      <View style={{
        flex: 1, flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}>Manually add</Text>
        <Ionicons.Button name="pencil" size={24} color="black" />
      </View>
    </View>
  );
}