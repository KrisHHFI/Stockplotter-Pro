// Table functions
import { initDatabase, deleteCompany, getCompany, getCompanies } from '../Databases/CompaniesDatabase.js';
import { getLanguage, getTheme } from '../Databases/SettingsDatabase.js';
// Themes
import HomePageStyles from '../Stylesheets/LightTheme/HomePageStyles';
import HomePageStylesDark from '../Stylesheets/DarkTheme/HomePageStylesDark.js';
// Page objects
import { Text, View, FlatList, Image, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// React functionality
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function HomePage() {
    const isFocused = useIsFocused();
    // Theme and language default values
    const [themeStyles, setThemeStyles] = useState(HomePageStyles);
    const [currentLanguage, setCurrentLanguage] = useState("English");
    // API search for company icons 
    const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";
    // Company list
    const [companies, setCompanies] = useState([]);

    // Language options
    const text = {
        English: {
            noCompaniesPlaceHolder: "No companies have been added.",
            savedCompanies: "Saved Companies",
            info: "Info",
        },
        Finnish: {
            noCompaniesPlaceHolder: "Yrityksia ei lisätty.",
            savedCompanies: "Tallennetut yritykset",
            info: "Tiedot",
        }
    };

    // Fetch and update data when the screen is active
    useEffect(() => {
        if (isFocused) {
            initDatabase();
            updateList();
            getCompanies((rows) => console.log('Home Page active\nAll of the companies in the DB:\n', rows));

            // Sets the page theme
            getTheme((rows) => {
                if (rows.length > 0) {
                    if (rows[0].theme === "Light") {
                        setThemeStyles(HomePageStyles);
                    } else {
                        setThemeStyles(HomePageStylesDark);
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

    // Used when displaying the rows on the screen
    const listSeparator = () => {
        return (
            <View
                style={themeStyles.listSeparator}
            />
        );
    };

    // Show stock info
    const expandItem = (id) => {
        getCompany(id, (companyData) => {
            if (companyData.ticker === "manuallyAddedCompany") {
                Alert.alert("Name: " + companyData.name, "\nNotes: " + companyData.note);
            } else {
                Alert.alert("Name: " + companyData.name, "\nTicker: " + companyData.ticker + "\nWebsite: " + companyData.website +
                    "\nLocale: " + companyData.locale + "\nDescription: " + companyData.sic_description.toLowerCase() + "\nEmployees: " +
                    companyData.employees + "\nMarket Cap: " + companyData.marketCap);
            }
        });
    };

    // Delete row
    const deleteItem = (id) => {
        deleteCompany(id, updateList);
    };

    // Update the companies list, by fetching from the db
    const updateList = () => {
        getCompanies((rows) => setCompanies(rows));
    };

    // Show the page "Saved Companies" title/or not
    const companiesTitle = () => {
        if (companies.length > 0) {
            return (
                <Text style={themeStyles.title}>{text[currentLanguage].savedCompanies}</Text>
            );
        }
        return null;
    };

    // Show companies placeholder/or not
    const companiesPlaceholder = () => {
        if (companies.length === 0) {
            return (
                <Text style={themeStyles.text}>{text[currentLanguage].noCompaniesPlaceHolder}</Text>
            );
        }
        return null;
    };

    // Show icon fetched from API or placeholder image
    const renderFlatListImage = (item) => {
        if (item?.icon === "Null") {
            return (
                <Image
                    source={require('../assets/PlaceholderImage.png')}
                    style={themeStyles.image}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: item.icon + '?apiKey=' + apiKey }}
                    style={themeStyles.image}
                />
            );
        }
    };

    return (
        // Page container
        <View style={themeStyles.container}>
            {/* The page header */}
            {companiesTitle()}
            {/* Companies placeholder, if no companies have been added */}
            <View style={themeStyles.placeholderCenter}>
                {companiesPlaceholder()}
            </View>
            {/* The company list */}
            <FlatList
                style={themeStyles.flatList}
                keyExtractor={(_, index) => index.toString()}
                data={companies}
                ItemSeparatorComponent={listSeparator}
                renderItem={({ item }) =>
                    // A company/ flat list item
                    <View style={themeStyles.flatListItem}>
                        {/* The company icon */}
                        {renderFlatListImage(item)}
                        <View>
                            {/* Company name, split by word, each on its own line */}
                            {item.name.split(' ').map((word, index) => (
                                <Text key={index} style={themeStyles.companyText}>{word}</Text>
                            ))}
                        </View>
                        {/* The item info and delete buttons */}
                        <View style={themeStyles.flatListItemButtons}>
                            <Pressable style={themeStyles.expandButton} onPress={() => expandItem(item.id)}>
                                <Text style={themeStyles.buttonFont}>{text[currentLanguage].info}</Text>
                            </Pressable>
                            <Pressable style={themeStyles.deleteButtonContainer}>
                                <Ionicons.Button
                                    name="trash"
                                    onPress={() => deleteItem(item.id)}
                                    size={20}
                                    style={themeStyles.deleteButton}
                                />
                            </Pressable>
                        </View>
                    </View>
                }
            />
        </View>
    );
}