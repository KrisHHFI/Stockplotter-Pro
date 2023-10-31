import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { initDatabase, getCompanies, insertCompany } from '../Databases/CompaniesDatabase.js';
import { useIsFocused } from '@react-navigation/native';
import AddPageStyles from '../Stylesheets/AddPageStyles';
import { useRef } from 'react'; // Used to clear the input box

export default function AddPage() {
  const [searchinput, setSearchinput] = useState("");
  const [addCompanyinput, setAddCompanyinput] = useState("");
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [result, setResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const isFocused = useIsFocused();
  const [searchInProgress, setSearchInProgress] = useState(false);
  const searchInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const notesInputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      console.log("Add page active");
      initDatabase();
      updateList();
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
            Alert.alert("Info", "Company: \"" + existingCompany.name + "\" already added.");
          } else {
            let url = 'https://api.polygon.io/v3/reference/tickers/' + input + '?apiKey=' + apiKey;
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log("API response: " + jsonData.status); //OK / NOT_FOUND / ERROR

            if (jsonData.status == "OK") { // Gives the user feedback for company searches
            } if (jsonData.status == "NOT_FOUND") {
              Alert.alert("Info", "Company ticker: \"" + input + "\" not found.");
            } else {
              Alert.alert("Info", "Error, please try again.");
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
                  Alert.alert("Info", "Company: " + companyName + " added.");
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
      Alert.alert("Info", "Company: \"" + name + "\" already added.");
    } else {
      insertCompany(name, "manuallyAddedCompany", "Null", "Null", "Null", "Null", "Null", "Null", notes)
        .then(() => {
          console.log('Company added to DB.');
          Alert.alert("Info", `Company: ${name} added.`);
        })
        .catch((error) => {
          console.error(`Error saving company to DB: ${error}`);
        });
    }
  };

  return (
    <View style={AddPageStyles.container}>
      <View style={AddPageStyles.pageSection}>
        <Text style={AddPageStyles.title}>Search</Text>
        <View style={AddPageStyles.pageSubSection}>
          <TextInput
            ref={searchInputRef}
            placeholder="Company ticker.."
            style={AddPageStyles.inputBox}
            onChangeText={text => setSearchinput(text)}
          />
          <Pressable style={AddPageStyles.buttonContainer}>
            <Ionicons.Button name="search" size={24} style={AddPageStyles.button} onPress={() => searchForCompany(searchinput)} />
          </Pressable>
        </View>
      </View>

      <View style={AddPageStyles.pageSection}>
        <Text style={AddPageStyles.title}>Create</Text>
        <View style={AddPageStyles.pageSubSection}>
          <View>
            <TextInput
              ref={nameInputRef}
              placeholder="Name.."
              style={AddPageStyles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, name: text }));
              }}
            />
            <TextInput
              ref={notesInputRef}
              placeholder="Notes.."
              style={AddPageStyles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, notes: text }));
              }}
            />
          </View>
          <Pressable style={AddPageStyles.buttonContainer}>
            <Ionicons.Button
              name="pencil"
              onPress={() => addCompany()}
              size={24}
              style={AddPageStyles.button}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}