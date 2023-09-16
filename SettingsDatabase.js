import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

const initThemeTable = () => {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists theme (id integer primary key not null, theme text);', [], () => {
                // Check if the theme table is empty, and if it is, insert the default theme
                tx.executeSql('select * from theme;', [], (_, { rows }) => {
                    if (rows.length === 0) {
                        tx.executeSql('insert into theme (theme) values (?);', ['light'], () => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            });
        });
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

export { db, initThemeTable, getTheme};