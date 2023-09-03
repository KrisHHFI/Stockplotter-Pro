import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists companies (id integer primary key not null, name text, ticker text);');
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

// Get saved companies
const getCompanies = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from companies;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

// Add a company
const insertCompany = (name, ticker, callback) => {
    db.transaction(tx => {
        tx.executeSql('insert into companies (name, ticker) values (?, ?);', [name, ticker]);
    }, null, callback);
};

export { db, initDatabase, deleteCompany, getCompanies, insertCompany };