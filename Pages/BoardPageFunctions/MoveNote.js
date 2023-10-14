// The note movement
export const moveNote = (event, noteId, prevNotes, setNotes) => {
  const { translationX, translationY } = event.nativeEvent;
  const updatedNotes = prevNotes.map((note) => {
      if (note.id !== noteId) return note;
      const panningSpeed = 0.065;
      // New X and Y position, with panning speed applied
      const newXPosition = translationX * panningSpeed;
      const newYPosition = translationY * panningSpeed;
      return {
        ...note,
        x: note.x + newXPosition,
        y: note.y + newYPosition,
      };
  });
  setNotes(updatedNotes);
};