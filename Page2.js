import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, initDatabase, deleteCompany, getCompanies, insertCompany } from './database.js';
import { useIsFocused } from '@react-navigation/native';
import page2Styles from './stylesheets/Page2Styles';

export default function Page2() {

  const [searchinput, setSearchinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const isFocused = useIsFocused();

  const [searchResponse, setSearchResponse] = useState(" ");

  useEffect(() => {
    initDatabase();
    updateList();
    getCompanies((rows) => console.log('\nCompanies from DB:', rows));
    setSearchResponse("");
  }, [isFocused]);

  // Save course
  const saveItem = (name, ticker, icon, locale, sicDescription, website, employees, marketCap) => {
    insertCompany(name, ticker, icon, locale, sicDescription, website, employees, marketCap, updateList);
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
        console.log("\nAPI response: " + jsonData.status); //OK / NOT_FOUND / ERROR

        if (jsonData.status == "OK") { // Gives the user feedback for company searches
          setSearchResponse("Company added.");
        } else if (jsonData.status == "NOT_FOUND") {
          setSearchResponse("Company not found.");
        } else {
          setSearchResponse("Error, please try again.");
        }

        setResult(jsonData);
        const companyName = jsonData.results.name;
        const companyTicker = jsonData.results.ticker;
        const companyIcon = jsonData.results.branding.icon_url;
        const companyLocale = jsonData.results.locale;
        const companySicDescription = jsonData.results.sic_description;
        const companyWebsite = jsonData.results.homepage_url
        const companyEmployees = jsonData.results.total_employees
        const companyMarketCap = jsonData.results.market_cap

        setCompanies([...companies, {
          name: companyName, ticker: companyTicker, icon: companyIcon, locale: companyLocale,
          sicDescription: companySicDescription, website: companyWebsite, employees: companyEmployees,
          marketCap: companyMarketCap
        }]);
        saveItem(companyName, companyTicker, companyIcon, companyLocale, companySicDescription, companyWebsite,
          companyEmployees, companyMarketCap); // Save fetched data to the database
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={page2Styles.pageSection}>
        <TextInput placeholder="Company ticker.." style={page2Styles.inputBox}
          onChangeText={text => setSearchinput(text)}
        />
        <Ionicons.Button name="search" size={24} color="black" onPress={() => fetchData(searchinput)} />
      </View>
      <Text>{searchResponse}</Text>

      <View style={page2Styles.pageSection}>
        <TextInput placeholder="Manually add.." style={page2Styles.inputBox}></TextInput>
        <Ionicons.Button name="pencil" size={24} color="black" />
      </View>
    </View>
  );
}