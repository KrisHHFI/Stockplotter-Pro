import { StyleSheet, Text, View, FlatList, Image, Button, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import HomePagestyles from '../Stylesheets/HomePageStyles';
import { useIsFocused } from '@react-navigation/native';
import { db, initDatabase, deleteCompany, getCompany, getCompanies } from '../Databases/CompaniesDatabase.js';

export default function HomePage() {

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
                style={HomePagestyles.listSeparator}
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

    // Show the companies H1 title/or not
    const companiesTitle = () => {
        if (companies.length > 0) {
            return (
                <Text style={HomePagestyles.title}>Saved Companies</Text>
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
                    style={HomePagestyles.image}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: item.icon + '?apiKey=' + apiKey }}
                    style={HomePagestyles.image}
                />
            );
        }
    };

    return (
        <View style={HomePagestyles.container}>
            {companiesTitle()}
            <View style={HomePagestyles.placeholderCenter}>
                {companiesPlaceholder()}
            </View>
            <FlatList
                style={HomePagestyles.flatList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={HomePagestyles.flatListItem}>
                        {renderCompanyImage(item)}
                        <View>
                            {/* Splits company name by word, each on its own line */}
                            {item.name.split(' ').map((word, index) => (
                                <Text key={index} style={HomePagestyles.companyText}>{word}</Text>
                            ))}
                        </View>
                        <View style={HomePagestyles.flatListItemButtons}>
                            <Pressable style={HomePagestyles.expandButton} onPress={() => expandItem(item.id)}>
                                <Text style={HomePagestyles.buttonFont}>Expand</Text>
                            </Pressable>

                            <Pressable style={HomePagestyles.deleteButton} onPress={() => deleteItem(item.id)}>
                                <Text style={HomePagestyles.buttonFont}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}