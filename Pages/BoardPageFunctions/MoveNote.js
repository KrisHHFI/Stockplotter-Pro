// The note movement
export const moveNote = (event, noteId, prevNotes, setNotes) => {
  const { translationX, translationY } = event.nativeEvent;

  const updatedNotes = prevNotes.map((note) => {
    if (note.id !== noteId) return note;

    const panningSpeed = 0.065;
    // Calculate new absolute positions, not just deltas
    let newXPosition = note.x + (translationX * panningSpeed);
    let newYPosition = note.y + (translationY * panningSpeed);

    // Set boundaries for the new positions
    // Left and top side
    newXPosition = Math.max(0, newXPosition);
    newYPosition = Math.max(0, newYPosition);
    // Right and bottom side
    newXPosition = Math.min(598, newXPosition);
    newYPosition = Math.min(915, newYPosition);

    return {
      ...note,
      x: newXPosition,
      y: newYPosition,
    };
  });

  setNotes(updatedNotes);
};
