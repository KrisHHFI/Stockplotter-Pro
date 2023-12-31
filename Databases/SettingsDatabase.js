import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

// Get language table
const getLanguage = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from language;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

// Get theme table
const getTheme = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from theme;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

// Initialises the language table
const initLanguageTable = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists language (id integer primary key not null, language text);', [], () => {
            // Check if the theme table is empty, and if it is, insert the default theme
            tx.executeSql('select * from language;', [], (_, { rows }) => {
                if (rows.length === 0) {
                    tx.executeSql('insert into language (language) values (?);', ['English']);
                }
            });
        });
    });
};

// Initialises the theme table
const initThemeTable = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists theme (id integer primary key not null, theme text);', [], () => {
            // Check if the theme table is empty, and if it is, insert the default theme
            tx.executeSql('select * from theme;', [], (_, { rows }) => {
                if (rows.length === 0) {
                    tx.executeSql('insert into theme (theme) values (?);', ['Light']);
                }
            });
        });
    });
};

// Function to update the language
const toggleLanguage = (newLanguage) => {
    db.transaction((tx) => {
        tx.executeSql('UPDATE language SET language = ? WHERE id = 1;', [newLanguage], (_, result) => {
            if (result.rowsAffected > 0) {
                console.log(`Language changed to \"${newLanguage}\".`);
            } else {
                console.log(`No rows updated.`);
            }
        });
    });
};

// Function to update the theme
const toggleTheme = (newTheme) => {
    db.transaction((tx) => {
        tx.executeSql('UPDATE theme SET theme = ? WHERE id = 1;', [newTheme], (_, result) => {
            if (result.rowsAffected > 0) {
                console.log(`Theme changed to \"${newTheme}\".`);
            } else {
                console.log(`No rows updated.`);
            }
        });
    });
};

export { db, getLanguage, getTheme, initLanguageTable, initThemeTable, toggleLanguage, toggleTheme };