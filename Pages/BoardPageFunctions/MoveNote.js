import { updateNote } from '../../Databases/BoardDatabase';

// The note gesture movement
export const moveNote = (event, noteId, prevNotes, setNotes) => {
  const { translationX, translationY } = event.nativeEvent;

  const updatedNotes = prevNotes.map((note) => {
    if (note.id !== noteId) return note;
    // Note movement speed brakes
    const panningSpeed = 0.065;
    // Calculate new positions. Current postion + new position value
    let newXPosition = note.x + (translationX * panningSpeed);
    let newYPosition = note.y + (translationY * panningSpeed);
    // Set board boundaries for the new positions
    // Left and top side
    newXPosition = Math.max(0, newXPosition);
    newYPosition = Math.max(0, newYPosition);
    // Right and bottom side
    newXPosition = Math.min(580, newXPosition);
    newYPosition = Math.min(915, newYPosition);
    const text = note.text;

    // Update the note in the database
    updateNote(noteId, text, note.x, note.y)
    .then(() => {
        //console.log('Note updated in table.'); //Testing only
    })
    .catch((error) => {
        console.error(`Error updating note in table: ${error}`);
    });

    return {
      ...note,
      x: newXPosition,
      y: newYPosition,
    };
  });
  // Update the notes list
  setNotes(updatedNotes);
};
