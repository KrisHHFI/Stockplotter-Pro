import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists companies (id integer primary key not null, name text, ticker text, icon text);');
    });
};

// Delete company
const deleteCompany = (id, callback) => {
    db.transaction(
        tx => {
            tx.executeSql(`delete from companies where id = ?;`, [id]);
        }, null, callback
    );
};

const getCompanies = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from companies;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

export { db, initDatabase, deleteCompany, getCompanies };