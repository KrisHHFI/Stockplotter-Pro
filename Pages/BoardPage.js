import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { boardPanning } from './BoardPageFunctions/BoardPanning';
import { addNote } from './BoardPageFunctions/AddNote';
import { editNote } from './BoardPageFunctions/EditNote';
import { moveNote } from './BoardPageFunctions/MoveNote';

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={(event) => boardPanning(event, setScreenXPosition, setScreenYPosition)}>
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
              <PanGestureHandler
                key={note.id}
                onGestureEvent={(event) => moveNote(event, note.id, notes, setNotes)}
              >
                <View
                  style={[
                    BoardPageStyles.noteContainer,
                    { left: note.x, top: note.y },
                  ]}
                >
                  <TextInput
                    style={[
                      BoardPageStyles.noteTextInput,
                    ]}
                    multiline={true}
                    numberOfLines={5}
                    key={note.id}
                    value={note.text}
                    onChangeText={(text) => editNote(text, note.id, notes, setNotes)}
                    onStartShouldSetResponder={() => true}
                  />
                </View>
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
          onPress={() => addNote(notes, setNotes)}
        />
      </View>
    </GestureHandlerRootView>
  );
}