// Edit an existing note
export const editNote = (text, noteId, notes, setNotes) => {
    const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
            const updatedNote = { ...note, text };
            return updatedNote;
        } else {
            return note;
        }
    });
    setNotes(updatedNotes);
};