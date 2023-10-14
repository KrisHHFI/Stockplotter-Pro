// Add a note to the Board
export const addNote = (notes, setNotes) => {
    console.log('Add note function called');

    const newNote = {
        id: notes.length + 1,
        text: 'New Note.',
        x: 320,
        y: 340,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
};