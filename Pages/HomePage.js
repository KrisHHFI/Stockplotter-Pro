import { StyleSheet, Text, View, FlatList, Image, Button, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import homeScreenstyles from '../Stylesheets/HomePageStyles';
import { useIsFocused } from '@react-navigation/native';
import { db, initDatabase, deleteCompany, getCompany, getCompanies } from '../Databases/CompaniesDatabase.js';

export default function HomeScreen() {

    const [companies, setCompanies] = useState([]);
    const isFocused = useIsFocused();
    const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";

    // Fetch and update data when the screen is active
    useEffect(() => {
        if (isFocused) {
            initDatabase();
            updateList();
            getCompanies((rows) => console.log('Home Page active\nAll of the companies in the DB:\n', rows));
        }
    }, [isFocused]);

    // Used when displaying the rows on screen
    const listSeparator = () => {
        return (
            <View
                style={homeScreenstyles.listSeparator}
            />
        );
    };

    // Show stock info
    const expandItem = (id) => {
        getCompany(id, (companyData) => {
            Alert.alert("Name: " + companyData.name, "\nTicker: " + companyData.ticker + "\nWebsite: " + companyData.website +
                "\nLocale: " + companyData.locale + "\nDescription: " + companyData.sic_description.toLowerCase() + "\nEmployees: " +
                companyData.employees + "\nMarket Cap: " + companyData.marketCap);
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

    // Show the companies H1 title/or not
    const companiesTitle = () => {
        if (companies.length > 0) {
            return (
                <Text style={homeScreenstyles.title}>Companies</Text>
            );
        }
        return null;
    };

    // Show companies placeholder/or not
    const companiesPlaceholder = () => {
        if (companies.length === 0) {
            return (
                <Text>No companies have been added.</Text>
            );
        }
        return null;
    };

    const renderCompanyImage = (item) => {

        if (item.icon === "Null") {
            return (
                <Image
                    source={require('../assets/PlaceholderImage.png')}
                    style={homeScreenstyles.image}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: item.icon + '?apiKey=' + apiKey }}
                    style={homeScreenstyles.image}
                />
            );
        }
    };

    return (
        <View style={homeScreenstyles.container}>
            {companiesTitle()}
            <View style={homeScreenstyles.placeholderCenter}>
                {companiesPlaceholder()}
            </View>
            <FlatList
                style={homeScreenstyles.flatList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={homeScreenstyles.flatListItem}>
                        {renderCompanyImage(item)}
                        <View>
                            {/* Splits company name by word, each on its own line */}
                            {item.name.split(' ').map((word, index) => (
                                <Text key={index} style={homeScreenstyles.companyText}>{word}</Text>
                            ))}
                        </View>

                        <Pressable style={homeScreenstyles.expandButton} onPress={() => expandItem(item.id)}>
                            <Text style={homeScreenstyles.buttonFont}>Expand</Text>
                        </Pressable>

                        <Pressable style={homeScreenstyles.deleteButton} onPress={() => deleteItem(item.id)}>
                            <Text style={homeScreenstyles.buttonFont}>Delete</Text>
                        </Pressable>
                    </View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}