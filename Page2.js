import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, initDatabase, deleteCompany, getCompanies, insertCompany } from './database.js';
import { useIsFocused } from '@react-navigation/native';

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    initDatabase();
    updateList();
  }, [isFocused]);

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  // Save course
  const saveItem = (name, ticker, icon, locale, sicDescription) => {
    insertCompany(name, ticker, icon, locale, sicDescription, updateList);
  };

  // Delete row
  const deleteItem = (id) => {
    deleteCompany(id, updateList);
  };

  // Get the company list
  const updateList = () => {
    getCompanies((rows) => setCompanies(rows));
  };

  const fetchData = async (input) => {
    try {
      if (input.trim() !== "") {
        let url = 'https://api.polygon.io/v3/reference/tickers/' + input.toUpperCase() + '?apiKey=' + apiKey;
        const response = await fetch(url);
        const jsonData = await response.json();
        setResult(jsonData);

        const companyName = jsonData.results.name;
        const companyTicker = jsonData.results.ticker;
        const companyIcon = jsonData.results.branding.icon_url;
        const companyLocale = jsonData.results.locale;
        const companySicDescription = jsonData.results.sic_description;



        setCompanies([...companies, { name: companyName, ticker: companyTicker, icon: companyIcon, locale: companyLocale, sicDescription: companySicDescription }]);
        saveItem(companyName, companyTicker, companyIcon, companyLocale, companySicDescription); // Save fetched data to the database
      }
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

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.name}, {item.ticker}</Text>
            <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> Delete</Text>
          </View>}
        data={companies}
        ItemSeparatorComponent={listSeparator}
      />

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