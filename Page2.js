import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");

  const [searchinput2, setSearchinput2] = useState("MCD");
  const apiKey = "";
  let url = 'https://api.polygon.io/v3/reference/tickers/' + searchinput2 + '?apiKey=' + apiKey;
  const [result, setResult] = useState(null);

  const buttonPressed = () => {
    Alert.alert("You searched", searchinput)
  }

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setResult(jsonData);
      Alert.alert("Result", result.results.name)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

      <Button title="Add Stock" onPress={fetchData} />

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