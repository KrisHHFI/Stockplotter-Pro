import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('companiesdb.db');

const initBoardTable = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists board (id integer primary key not null, text text, x integer, y integer);');
    });
};

// Get saved notes
const getNotes = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from board ORDER BY text;', [], (_, { rows }) =>
            callback(rows._array)
        );
    });
};

// Add a note
const insertNote = (text, x, y) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('insert into board (text, x, y) values (?, ?, ?);', [text, x, y], (_, result) => {
                resolve(result);
            }, (_, error) => {
                reject(error);
            });
        });
    });
};

// Delete the selected note
const deleteNote = (activeNoteId) => {
    db.transaction(tx => {
        tx.executeSql('delete from board where id = ?;', [activeNoteId],
            (_, result) => {
                console.log('Note ' + activeNoteId + ' deleted');
            },
            (_, error) => {
                console.error(`Error deleting note with ID ${activeNoteId}: ${error.message}`);
            }
        );
    });
};

// Update an existing note
const updateNote = (id, text, x, y) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('update board set text = ?, x = ?, y = ? where id = ?;', [text, x, y, id], (_, result) => {
                resolve(result);
            }, (_, error) => {
                reject(error);
            });
        });
    });
};

export { db, initBoardTable, insertNote, deleteNote, getNotes, updateNote }