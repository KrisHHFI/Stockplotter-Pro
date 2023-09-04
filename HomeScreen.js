import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import { useIsFocused } from '@react-navigation/native';
import { db, initDatabase, deleteCompany, getCompanies } from './database.js';

export default function HomeScreen() {

    const [companies, setCompanies] = useState([]);
    const isFocused = useIsFocused();

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
            <Text>Logo | Stats</Text>

            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.icon}, {item.name}</Text>
                    <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> Delete</Text></View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}