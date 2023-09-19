import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists companies (id integer primary key not null, name text, ticker text, icon text, locale text, sic_description text, website text, employees integer, marketCap integer, note text);');
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
        tx.executeSql('select * from companies ORDER BY name;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

// Get one company
const getCompany = (id, callback) => {
    db.transaction(
        tx => {
            tx.executeSql(`select * from companies where id = ?;`, [id], (_, { rows }) =>
                callback(rows.item(0))
            );
        }, null, () => { }
    );
};

// Add a company
const insertCompany = (name, ticker, icon, locale, sic_description, website, employees, marketCap, note) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('insert into companies (name, ticker, icon, locale, sic_description, website, employees, marketCap, note) values (?, ?, ?, ?, ?, ?, ?, ?, ?);', [name, ticker, icon, locale, sic_description, website, employees, marketCap, note], (_, result) => {
                resolve(result);
            }, (_, error) => {
                reject(error);
            });
        });
    });
};

export { db, initDatabase, deleteCompany, getCompany, getCompanies, insertCompany };