import { updateNote } from '../../Databases/BoardDatabase';

// Edit an existing note
export const updateNoteHandler = (text, noteId, notes, setNotes) => {
    const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
            const updatedNote = { ...note, text };

            // Update the note in the table
            updateNote(noteId, text, note.x, note.y)
                .then(() => {
                    //console.log('Note updated in table.'); //Testing only
                })
                .catch((error) => {
                    console.error(`Error updating note in table: ${error}`);
                });
            // The note is saved to screen. Different from saving to table
            return updatedNote;
        } else {
            return note;
        }
    });
    setNotes(updatedNotes);
};