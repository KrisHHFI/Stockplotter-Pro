import { insertNote} from '../../Databases/BoardDatabase';

// Add a note to the Board
export const addNote = (notes, setNotes, text) => {
    console.log('Add note function called');

    insertNote("New Note.", 320, 340)
        .then(() => {
          console.log('Note added to table.');
        })
        .catch((error) => {
          console.error(`Error saving note to table: ${error}`);
        });
/*
    const newNote = {
        id: notes.length + 1,
        text: 'New Note.',
        x: 320,
        y: 340,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    */
};