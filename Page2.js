import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);

  // Creates a table if one does not exist already
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists companies (id integer primary key not null, name text, ticker text);');
    }, null, updateList);
  }, []);

  // Update company list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from companies;', [], (_, { rows }) =>
        setCompanies(rows._array)
      );
    });
  }

  // Delete company
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from companies where id = ?;`, [id]);
      }, null, updateList
    )
  }

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
  const saveItem = (name, ticker) => {
    db.transaction(tx => {
      tx.executeSql('insert into companies (name, ticker) values (?, ?);', [name, ticker]);
    }, null, updateList
    )
  }

  const fetchData = async (input) => {
    try {
      if (input.trim() !== "") {
        let url = 'https://api.polygon.io/v3/reference/tickers/' + input.toUpperCase() + '?apiKey=' + apiKey;
        const response = await fetch(url);
        const jsonData = await response.json();
        setResult(jsonData);

        const companyName = jsonData.results.name;
        const companyTicker = jsonData.results.ticker;

        setCompanies([...companies, { name: companyName, ticker: companyTicker }]);
        saveItem(companyName, companyTicker); // Save fetched data to the database
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
        renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.name}, {item.ticker}</Text>
          <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> Delete</Text></View>}
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
