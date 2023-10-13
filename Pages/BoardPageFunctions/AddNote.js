// Add a note to the Board
export const addNote = (notes) => {
    console.log('Add note function called');

    const newNote = {
        id: notes.length + 1,
        text: 'New Note.',
        x: 350,
        y: 370,
    };
    return [...notes, newNote];
};