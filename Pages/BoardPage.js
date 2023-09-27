import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function BoardPage() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);
  // Define the initial screen position
  const [translateX, setScreenXPosition] = useState(-250);
  const [translateY, setScreenYPosition] = useState(-140);

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

  // Enables the user to pan around the screen
  const boardPanning = (event) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // Page boundaries
    const pageXBoundary = windowWidth - 860;
    const pageYBoundary = windowHeight - 975;
    // The X and Y gesture movement
    const { translationX, translationY, state } = event.nativeEvent;
    // How fast the user can pan around the screen
    const panningSpeed = 0.07;
    // New X and Y position, with panning speed applied
    const newXPosition = translationX * panningSpeed;
    const newYPosition = translationY * panningSpeed;
    // Move along X axis
    setScreenXPosition((previousXPosition) => Math.min(0, Math.max(pageXBoundary, previousXPosition + newXPosition)));
    // Move along Y axis
    setScreenYPosition((previousYPosition) => Math.min(0, Math.max(pageYBoundary, previousYPosition + newYPosition)));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={boardPanning}>
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
              <TextInput
                style={[
                  BoardPageStyles.note,
                  {
                    left: note.x,
                    top: note.y,
                  },
                ]}
                key={note.id}
                value={note.text}
                onChangeText={(text) => changeNote(text, note.id)}
              />
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