import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { boardPanning } from './BoardPageFunctions/BoardPanning';
import { updateNoteHandler } from './BoardPageFunctions/UpdateNoteHandler';
import { moveNote } from './BoardPageFunctions/MoveNote';
import { db, initBoardTable, deleteNote, insertNote, getNotes } from '../Databases/BoardDatabase';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function BoardPage() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);
  // Define the initial screen position
  const [translateX, setScreenXPosition] = useState(-250);
  const [translateY, setScreenYPosition] = useState(-140);

  const [activeNoteId, setActiveNoteId] = useState(null);

  // Update the notes list, by fetching from the table
  const updateList = () => {
    getNotes((rows) => setNotes(rows));
  };

  // Runs every time the page is viewed
  useEffect(() => {
    if (isFocused) {
      getNotes((rows) => console.log('Cork Board page active\nAll of the notes in the DB:\n', rows));
      initBoardTable();
      updateList();
      setActiveNoteId(null);
    }
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={(event) => boardPanning(event, setScreenXPosition, setScreenYPosition)}>
          <View style={BoardPageStyles.container}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setActiveNoteId(null)}
            >
              <View
                style={[
                  BoardPageStyles.boardContainer, {/* Initial Screen position */ },
                  { transform: [{ translateX }, { translateY }] },
                ]}
                onStartShouldSetResponder={() => {
                  setActiveNoteId(null);
                  Keyboard.dismiss();
                  return false;
                }}
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
                        onChangeText={(text) => updateNoteHandler(text, note.id, notes, setNotes)}
                        onStartShouldSetResponder={() => true}
                        onFocus={() => setActiveNoteId(note.id)}
                      />
                    </View>
                  </PanGestureHandler>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
        <View style={BoardPageStyles.addNoteContainer}>
          <Ionicons.Button
            name="md-add-circle-sharp"
            size={24}
            color="black"
            onPress={() => {
              insertNote("New Note.", 320, 340)
                .then(() => {
                  console.log('Note added to table.');
                  updateList();
                })
                .catch((error) => {
                  console.error(`Error saving note to table: ${error}`);
                });
            }}
          />
        </View>
        <View style={BoardPageStyles.deleteNoteContainer}>
          <Ionicons.Button
            name="remove-circle"
            size={24}
            color="black"
            onPress={() => {
              deleteNote(activeNoteId)
                .then(() => {
                  updateList();
                  setActiveNoteId(null);
                })
                .catch((error) => {
                  console.error(`Error deleting note: ${error}`);
                });
            }}
          />
        </View>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}