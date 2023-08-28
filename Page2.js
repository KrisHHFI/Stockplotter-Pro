import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);

  const [company, setCompany] = useState({
    name: 'name',
    ticker: 'ticker'
  });

  const fetchData = async (input) => {
    try {
      let url = 'https://api.polygon.io/v3/reference/tickers/' + input + '?apiKey=' + apiKey;
      const response = await fetch(url);
      const jsonData = await response.json();
      setResult(jsonData);

      setCompany({
        name: jsonData.results.name,
        ticker: jsonData.results.ticker
      });

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
          onChangeText={text => setSearchinput(text)}
        />
        <Ionicons.Button name="search" size={24} color="black" onPress={() => fetchData(searchinput)} />
      </View>

      <Text>{company.name + " " + company.ticker}</Text>

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
