import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Styles'
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const db = SQLite.openDatabase('companiesdb.db');

export default function HomeScreen() {

    const [companies, setCompanies] = useState([]);
    const isFocused = useIsFocused();

    // Fetch and update data when the screen is actuve
    useEffect(() => {
        if (isFocused) {
            updateList();
        }
    }, [isFocused]);

    // Update company list
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from companies;', [], (_, { rows }) =>
                setCompanies(rows._array)
            );
        });
    }

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

    // Delete company
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from companies where id = ?;`, [id]);
            }, null, updateList
        )
    }

    return (
        <View style={styles.container}>
            <Text>Logo | Stats</Text>

            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.name}, {item.ticker}</Text>
                    <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> Delete</Text></View>}
                data={companies}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}