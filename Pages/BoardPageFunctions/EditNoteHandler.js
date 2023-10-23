// Edit an existing note
import { editNote } from '../../Databases/BoardDatabase';

export const editNoteHandler = (text, noteId, notes, setNotes) => {
    const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
            const updatedNote = { ...note, text };

            // Update the note in the database
            editNote(noteId, text, note.x, note.y)
                .then(() => {
                    //console.log('Note updated in table.'); //Testing only
                })
                .catch((error) => {
                    console.error(`Error updating note in table: ${error}`);
                });

            return updatedNote;
        } else {
            return note;
        }
    });
    setNotes(updatedNotes);
};
