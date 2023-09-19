import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, initDatabase, deleteCompany, getCompanies, insertCompany } from '../Databases/CompaniesDatabase.js';
import { useIsFocused } from '@react-navigation/native';
import page2Styles from '../Stylesheets/AddPageStyles';
import { useRef } from 'react'; // Used to clear the input box

export default function Page2() {
  const [searchinput, setSearchinput] = useState("");
  const [addCompanyinput, setAddCompanyinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const isFocused = useIsFocused();
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchResponse, setSearchResponse] = useState(" ");
  const searchInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const notesInputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      console.log("Add page active");
      initDatabase();
      updateList();
      setSearchResponse("");
      setSearchinput("");
      setAddCompanyinput("");
      searchInputRef.current.clear();
      nameInputRef.current.clear();
      notesInputRef.current.clear();
    }
  }, [isFocused]);

  // Get the company list
  const updateList = () => {
    getCompanies((rows) => setCompanies(rows));
  };

  // Searches for company by its ticker, via a stock API, then adds it to the db
  const searchForCompany = async (input) => {
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
              const results = jsonData.results;
              let companyName = jsonData.results.name;
              if (companyName.split(' ').length > 3) {
                companyName = companyName.split(' ').slice(0, 3).join(' ') + '...';
              }
              let companyTicker = jsonData.results.ticker || "Null";
              let companyIcon = jsonData.results.branding.icon_url || "Null";
              let companyLocale = jsonData.results.locale || "Null";
              let companySicDescription = results.sic_description || "Null";
              let companyWebsite = jsonData.results.homepage_url || "Null";
              let companyEmployees = jsonData.results.total_employees;
              companyEmployees = companyEmployees.toLocaleString();
              companyEmployees = companyEmployees.split(',')[0];
              companyEmployees = companyEmployees.replace(/\s/g, ',');
              let companyMarketCap = jsonData.results.market_cap;
              companyMarketCap = companyMarketCap.toLocaleString();
              companyMarketCap = companyMarketCap.split(',')[0];
              companyMarketCap = companyMarketCap.replace(/\s/g, ',');
              const companyNote = "Null";

              setCompanies([...companies, {
                name: companyName, ticker: companyTicker, icon: companyIcon, locale: companyLocale,
                sicDescription: companySicDescription, website: companyWebsite, employees: companyEmployees,
                marketCap: companyMarketCap, note: companyNote
              }]);
              insertCompany(companyName, companyTicker, companyIcon, companyLocale, companySicDescription, companyWebsite,
                companyEmployees, companyMarketCap, companyNote)
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

  // Add a company manually
  const addCompany = () => {
    const { name = '', notes = '' } = addCompanyinput;
    // If the inputs are empty do nothing
    if (name.trim() === '' || notes.trim() === '') {
      return;
    }
    const existingCompany = companies.find(company => company.name === name);

    if (existingCompany) {
      setSearchResponse("Company: \"" + name + "\" already added.");
    } else {
      insertCompany(name, "Null", "Null", "Null", "Null", "Null", "Null", "Null", notes)
        .then(() => {
          console.log('Company added to DB.');
          setSearchResponse(`Company: ${name} added.`);
        })
        .catch((error) => {
          console.error(`Error saving company to DB: ${error}`);
        });
    }
  };

  return (
    <View style={page2Styles.container}>
      <View style={page2Styles.pageSection}>
        <Text>Search for a Company</Text>
        <View style={page2Styles.pageSubSection}>
          <TextInput
            ref={searchInputRef}
            placeholder="Company ticker.."
            style={page2Styles.inputBox}
            onChangeText={text => setSearchinput(text)}
          />
          <Ionicons.Button name="search" size={24} color="black" onPress={() => searchForCompany(searchinput)} />
        </View>
      </View>
      <View style={page2Styles.pageSection}>
        <Text>Manually Add a Company</Text>
        <View style={page2Styles.pageSubSection}>
          <View style={page2Styles.pageGroup}>
            <TextInput
              ref={nameInputRef}
              placeholder="Name.."
              style={page2Styles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, name: text }));
              }}
            />
            <TextInput
              ref={notesInputRef}
              placeholder="Notes.."
              style={page2Styles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, notes: text }));
              }}
            />
          </View>
          <Ionicons.Button name="pencil" size={24} color="black" onPress={() => addCompany()} />
        </View>
        <Text>{searchResponse}</Text>
      </View>
    </View>
  );
}