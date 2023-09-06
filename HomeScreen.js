import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import homeScreenstyles from './stylesheets/HomeScreenStyles';
import { useIsFocused } from '@react-navigation/native';
import { db, initDatabase, deleteCompany, getCompanies } from './database.js';

export default function HomeScreen() {

    const [companies, setCompanies] = useState([]);
    const isFocused = useIsFocused();
    const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";

    // Fetch and update data when the screen is active
    useEffect(() => {
        if (isFocused) {
            initDatabase();
            updateList();
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

    // Delete row
    const deleteItem = (id) => {
        deleteCompany(id, updateList);
    };
    // Get the company list
    const updateList = () => {
        getCompanies((rows) => setCompanies(rows));
    };

    return (
        <View style={homeScreenstyles.container}>
            <FlatList
                style={homeScreenstyles.flatList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={homeScreenstyles.flatListItem}>
                        <Image
                            source={{ uri: item.icon + '?apiKey=' + apiKey }}
                            style={homeScreenstyles.image}
                        />
                        <Text style={homeScreenstyles.companyText}>{item.name}</Text>
                        <Text style={homeScreenstyles.deleteFont} onPress={() => deleteItem(item.id)}> Delete</Text>
                    </View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}