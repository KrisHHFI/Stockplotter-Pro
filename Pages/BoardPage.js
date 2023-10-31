import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { boardPanning } from './BoardPageFunctions/BoardPanning';
import { updateNoteHandler } from './BoardPageFunctions/UpdateNoteHandler';
import { moveNote } from './BoardPageFunctions/MoveNote';
import { initBoardTable, deleteAllNotes, deleteNote, insertNote, getNotes } from '../Databases/BoardDatabase';
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
                <View style={BoardPageStyles.resetBoardContainer}>
                  <Text style={BoardPageStyles.resetBoardButton}
                    onPress={() => {
                      deleteAllNotes()
                        .then(() => {
                          updateList();
                        })
                    }}>
                    Reset Board?
                  </Text>
                </View>
                {/* The board */}
                <Text style={BoardPageStyles.centerOfBoard}>+</Text>
                {notes.map((note, index) => (
                  <PanGestureHandler
                    key={note.id}
                    onGestureEvent={(event) => {
                      moveNote(event, note.id, notes, setNotes),
                        setActiveNoteId(note.id)
                    }}
                  >
                    <View
                      style={[
                        BoardPageStyles.noteContainer,
                        { left: note.x, top: note.y },
                        (activeNoteId === note.id) && BoardPageStyles.activeNoteContainer
                      ]}
                    >
                      <TextInput
                        style={[
                          BoardPageStyles.noteTextInput,
                        ]}
                        key={note.id}
                        maxLength={50}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(text) => updateNoteHandler(text, note.id, notes, setNotes)}
                        onFocus={() => setActiveNoteId(note.id)}
                        onStartShouldSetResponder={() => true}
                        value={note.text}
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
            size={30}
            style={BoardPageStyles.addNoteButton}
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
        {
          activeNoteId !== null && ( // Render delete button when a note is active
            <View style={BoardPageStyles.deleteNoteContainer}>
              <Ionicons.Button
                name="trash"
                size={30}
                style={BoardPageStyles.deleteNoteButton}
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
          )
        }
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}