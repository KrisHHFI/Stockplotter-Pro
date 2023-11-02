// Table functions
import { initDatabase, getCompanies, insertCompany } from '../Databases/CompaniesDatabase.js';
import { getLanguage, getTheme } from '../Databases/SettingsDatabase.js';
// Themes
import AddPageStyles from '../Stylesheets/LightTheme/AddPageStyles';
import AddPageStylesDark from '../Stylesheets/DarkTheme/AddPageStylesDark.js';
// Page objects
import { Text, View, Alert, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// React functionality
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useRef } from 'react'; // Used to clear the input box

export default function AddPage() {
  const isFocused = useIsFocused();
  // Page objects
  const [searchinput, setSearchinput] = useState("");
  const [addCompanyinput, setAddCompanyinput] = useState("");
  const searchInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const notesInputRef = useRef(null);
  // Theme and language default values
  const [themeStyles, setThemeStyles] = useState(AddPageStyles);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  // API company search
  const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
  const [searchInProgress, setSearchInProgress] = useState(false);
  // Company list
  const [companies, setCompanies] = useState([]);

  // Language options
  const text = {
    English: {
      search: "Search",
      ticker: "Company ticker...",
      create: "Create",
      name: "Name...",
      notes: "Notes...",
      //The alert messages
      info: "Info",
      company: "Company",
      alertTicker: " ticker",
      notFound: " not found",
      error: "Error, please try again",
      alreadyAdded: " already added.",
      added: " added.",
      inputCantBeBlank: "Inputs can't be blank.",
    },
    Finnish: {
      search: "Hae",
      ticker: "Yrityksen ticker...",
      create: "Luo",
      name: "Nimi...",
      notes: "Huomautuksia...",
      //The alert messages
      info: "Tiedot",
      company: "Yhtiö",
      alertTicker: " koodi",
      notFound: " ei löydetty",
      error: "Virhe, yritä uudelleen",
      alreadyAdded: " jo lisätty.",
      added: " lisätty.",
      inputCantBeBlank: "Kentät eivät voi olla tyhjiä.",
    }
  };

  // called whenever the page is loaded
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

      // Sets the page theme
      getTheme((rows) => {
        if (rows.length > 0) {
          if (rows[0].theme === "Light") {
            setThemeStyles(AddPageStyles);
          } else {
            setThemeStyles(AddPageStylesDark);
          }
        }
      });

      // Sets the page language
      getLanguage((rows) => {
        if (rows.length > 0) {
          if (rows[0].language === "English") {
            setCurrentLanguage("English");
          } else {
            setCurrentLanguage("Finnish");
          }
        }
      });
    }
  }, [isFocused]);

  // Update the company list from the table
  const updateList = () => {
    getCompanies((rows) => setCompanies(rows));
  };

  // Searches for company by its ticker, via a stock API, then adds it to the table
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
          // If company already exists, then don't search
          if (existingCompany) {
            Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].company}` + ": \"" + existingCompany.name +
              "\"" + `${text[currentLanguage].alreadyAdded}`);
            // The API search
          } else {
            let url = 'https://api.polygon.io/v3/reference/tickers/' + input + '?apiKey=' + apiKey;
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log("API response: " + jsonData.status); //OK / NOT_FOUND / ERROR
            // How the search response is handled
            if (jsonData.status == "OK") {
            } if (jsonData.status == "NOT_FOUND") {
              Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].company}` + `${text[currentLanguage].alertTicker}` +
                ": \"" + input + "\"" + `${text[currentLanguage].notFound}` + ".");
            } else {
              Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].error}` + ".");
            }
            // If the JSON features a "results" property, then the company is added
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
              // Update the company list
              setCompanies([...companies, {
                name: companyName, ticker: companyTicker, icon: companyIcon, locale: companyLocale,
                sicDescription: companySicDescription, website: companyWebsite, employees: companyEmployees,
                marketCap: companyMarketCap, note: companyNote
              }]);
              // Add company to table
              insertCompany(companyName, companyTicker, companyIcon, companyLocale, companySicDescription, companyWebsite,
                companyEmployees, companyMarketCap, companyNote)
                .then(() => {
                  console.log("Company added to DB.");
                  Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].company}` + ": " + companyName +
                    `${text[currentLanguage].added}`);
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
      Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].inputCantBeBlank}`);
      return;
    }
    const existingCompany = companies.find(company => company.name === name);

    // If company exists don't add it again
    if (existingCompany) {
      Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].company}` + ": \"" + name + "\"" +
        `${text[currentLanguage].alreadyAdded}`);
      return;
      // Add company
    } else {
      setCompanies([...companies, {
        name: name, ticker: "manuallyAddedCompany", icon: "Null", locale: "Null",
        sicDescription: "Null", website: "Null", employees: "Null",
        marketCap: "Null", note: notes
      }]);
      insertCompany(name, "manuallyAddedCompany", "Null", "Null", "Null", "Null", "Null", "Null", notes)
        .then(() => {
          console.log('Company added to DB.');
          Alert.alert(`${text[currentLanguage].info}`, `${text[currentLanguage].company}` + ": " + `${name}` + `${text[currentLanguage].added}`);
        })
        .catch((error) => {
          console.error(`Error saving company to DB: ${error}`);
        });
    }
  };

  return (
    <View style={themeStyles.container}>
      <View style={themeStyles.pageSection}>
        <Text style={themeStyles.title}>{text[currentLanguage].search}</Text>
        <View style={themeStyles.pageSubSection}>
          <TextInput
            ref={searchInputRef}
            placeholder={text[currentLanguage].ticker}
            placeholderTextColor={themeStyles.placeholderTextColor.color}
            style={themeStyles.inputBox}
            onChangeText={text => setSearchinput(text)}
          />
          <Pressable>
            <Ionicons.Button name="search" size={24} style={themeStyles.button} onPress={() => searchForCompany(searchinput)} />
          </Pressable>
        </View>
      </View>

      <View style={themeStyles.pageSection}>
        <Text style={themeStyles.title}>{text[currentLanguage].create}</Text>
        <View style={themeStyles.pageSubSection}>
          <View>
            <TextInput
              ref={nameInputRef}
              placeholder={text[currentLanguage].name}
              placeholderTextColor={themeStyles.placeholderTextColor.color}
              style={themeStyles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, name: text }));
              }}
            />
            <TextInput
              ref={notesInputRef}
              placeholder={text[currentLanguage].notes}
              placeholderTextColor={themeStyles.placeholderTextColor.color}
              style={themeStyles.inputBox}
              onChangeText={(text) => {
                setAddCompanyinput((prevState) => ({ ...prevState, notes: text }));
              }}
            />
          </View>
          <Pressable style={themeStyles.buttonContainer}>
            <Ionicons.Button
              name="pencil"
              onPress={() => addCompany()}
              size={24}
              style={themeStyles.button}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}