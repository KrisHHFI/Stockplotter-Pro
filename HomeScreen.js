import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import { useIsFocused } from '@react-navigation/native';
import { db, initDatabase, deleteCompany, getCompanies } from './database.js';

export default function HomeScreen() {

    const [companies, setCompanies] = useState([]);
    const isFocused = useIsFocused();
    const apiKey = "cl7Ia65FhThK_ldjqiazYEB_qK4yhlFe";

    // Fetch and update data when the screen is actuve
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
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
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
        <View style={styles.container}>
            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: item.icon + '?apiKey=' + apiKey }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                margin: 8
                            }}
                        />
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> Delete</Text>
                    </View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}