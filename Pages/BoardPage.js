import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { boardPanning } from './BoardPageFunctions/BoardPanning';

export default function BoardPage() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);
  // Define the initial screen position
  const [translateX, setScreenXPosition] = useState(-250);
  const [translateY, setScreenYPosition] = useState(-140);
  // Uses imported BoardPanning.js function
  const boardPanningHandler = (event) => {
    boardPanning(event, translateX, setScreenXPosition, translateY, setScreenYPosition);
  };

  // Runs every time the page is viewed
  useEffect(() => {
    if (isFocused) {
      console.log('Cork Board page active');
    }
  }, [isFocused]);

  // Add a note to the Board
  const addNote = () => {
    console.log('Add note function called');

    const newNote = {
      id: notes.length + 1,
      text: 'New Note.',
      x: 350,
      y: 370,
    };
    setNotes([...notes, newNote]);
  };

  // Edit an existing note
  const changeNote = (text, noteId) => {
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

  // Handle the note drag
  const moveNote = (event, noteId) => {
    const { translationX, translationY } = event.nativeEvent;
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== noteId) return note;
        const panningSpeed = 0.07;
        // New X and Y position, with panning speed applied
        const newXPosition = translationX * panningSpeed;
        const newYPosition = translationY * panningSpeed;
        return {
          ...note,
          x: note.x + newXPosition,
          y: note.y + newYPosition,
        };
      })
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={boardPanningHandler}>
        <View style={BoardPageStyles.container}>
          <View
            style={[
              BoardPageStyles.boardContainer, {/* Initial Screen position */ },
              {
                transform: [{ translateX }, { translateY }],
              },
            ]}
          >
            {/* The board */}
            <Text style={BoardPageStyles.centerOfBoard}>+</Text>
            {notes.map((note, index) => (
              {/* <TextInput */ },
              <PanGestureHandler
                key={note.id}
                onGestureEvent={(event) => moveNote(event, note.id)}
              >
                {/*   <TextInput */}
                <Text
                  style={[
                    BoardPageStyles.note,
                    { left: note.x, top: note.y },
                  ]}
                  key={note.id}
                  value={note.text}
                  onChangeText={(text) => changeNote(text, note.id)}
                  onStartShouldSetResponder={() => true}
                />
              </PanGestureHandler>
            ))}
          </View>
        </View>
      </PanGestureHandler>
      <View style={BoardPageStyles.addNoteContainer}>
        <Ionicons.Button
          name="md-add-circle-sharp"
          size={24}
          color="black"
          onPress={() => addNote()}
        />
      </View>
    </GestureHandlerRootView>
  );
}