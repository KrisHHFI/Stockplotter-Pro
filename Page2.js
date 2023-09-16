import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, initDatabase, deleteCompany, getCompanies, insertCompany } from './CompaniesDatabase.js';
import { useIsFocused } from '@react-navigation/native';
import page2Styles from './stylesheets/Page2Styles';
import { useRef } from 'react'; // Used to clear the input box

export default function Page2() {
  const [searchinput, setSearchinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const isFocused = useIsFocused();
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchResponse, setSearchResponse] = useState(" ");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      console.log("Add page active");
      initDatabase();
      updateList();
      setSearchResponse("");
      searchInputRef.current.clear();
      setSearchinput("");
    }
  }, [isFocused]);

  // Get the company list
  const updateList = () => {
    getCompanies((rows) => setCompanies(rows));
  };

  const fetchData = async (input) => {
    if (searchInProgress) {// If a search is already in progress, do nothing
      return;
    }
    else {
      setSearchInProgress(true);
      input = input.toUpperCase()
      try {
        if (input.trim() !== "") {
          const existingCompany = companies.find(company => company.ticker === input);

          if (existingCompany) {
            setSearchResponse("Company: \"" + existingCompany.name + "\" already added.");
          } else {
            let url = 'https://api.polygon.io/v3/reference/tickers/' + input + '?apiKey=' + apiKey;
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log("API response: " + jsonData.status); //OK / NOT_FOUND / ERROR

            if (jsonData.status == "OK") { // Gives the user feedback for company searches
            } if (jsonData.status == "NOT_FOUND") {
              setSearchResponse("Company ticker: \"" + input + "\" not found.");
            } else {
              setSearchResponse("Error, please try again.");
            }

            setResult(jsonData);
            if (jsonData.results) {
              let companyName = jsonData.results.name;
              if (companyName.split(' ').length > 3) {
                companyName = companyName.split(' ').slice(0, 3).join(' ') + '...';
              }
              const companyTicker = jsonData.results.ticker;
              const companyIcon = jsonData.results.branding.icon_url;
              const companyLocale = jsonData.results.locale;
              const companySicDescription = jsonData.results.sic_description;
              const companyWebsite = jsonData.results.homepage_url;
              let companyEmployees = jsonData.results.total_employees;
              companyEmployees = companyEmployees.toLocaleString();
              companyEmployees = companyEmployees.split(',')[0];
              companyEmployees = companyEmployees.replace(/\s/g, ',');
              let companyMarketCap = jsonData.results.market_cap;
              companyMarketCap = companyMarketCap.toLocaleString();
              companyMarketCap = companyMarketCap.split(',')[0];
              companyMarketCap = companyMarketCap.replace(/\s/g, ',');

              setCompanies([...companies, {
                name: companyName, ticker: companyTicker, icon: companyIcon, locale: companyLocale,
                sicDescription: companySicDescription, website: companyWebsite, employees: companyEmployees,
                marketCap: companyMarketCap
              }]);
              insertCompany(companyName, companyTicker, companyIcon, companyLocale, companySicDescription, companyWebsite,
                companyEmployees, companyMarketCap)
                .then(() => {
                  console.log("Company added to DB.");
                  setSearchResponse("Company: " + companyName + " added.");
                })
                .catch(error => {
                  console.log(error + "Company not saved to DB.");
                });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setSearchInProgress(false); // Set searchInProgress state to false to enable the button again
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={page2Styles.pageSection}>
        <Text>Search for a Company</Text>
        <View style={page2Styles.pageSubSection}>
          <TextInput
            ref={searchInputRef}
            placeholder="Company ticker.."
            style={page2Styles.inputBox}
            onChangeText={text => setSearchinput(text)}
          />
          <Ionicons.Button name="search" size={24} color="black" onPress={() => fetchData(searchinput)} />
        </View>
        <Text>{searchResponse}</Text>
      </View>
      <View style={page2Styles.pageSection}>
        <Text>Manually Add a Company</Text>
        <View style={page2Styles.pageSubSection}>
          <View style={page2Styles.pageGroup}>
            <TextInput placeholder="Name.." style={page2Styles.inputBox}></TextInput>
            <TextInput placeholder="Notes.." style={page2Styles.inputBox}></TextInput>
          </View>
          <Ionicons.Button name="pencil" size={24} color="black" />
        </View>
        <Text>DB Response</Text>
      </View>
    </View>
  );
}