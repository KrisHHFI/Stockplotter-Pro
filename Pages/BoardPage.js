// Table functions
import { initBoardTable, deleteAllNotes, deleteNote, insertNote, getNotes } from '../Databases/BoardDatabase';
import { getLanguage, getTheme } from '../Databases/SettingsDatabase.js';
// Themes
import BoardPageStyles from '../Stylesheets/LightTheme/BoardPageStyles';
import BoardPageStylesDark from '../Stylesheets/DarkTheme/BoardPageStylesDark';
// Page objects
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
// React functionality
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
// Board external functions
import { boardPanning } from './BoardPageFunctions/BoardPanning';
import { updateNoteHandler } from './BoardPageFunctions/UpdateNoteHandler';
import { moveNote } from './BoardPageFunctions/MoveNote';

export default function BoardPage() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);
  // Theme and language default values
  const [themeStyles, setThemeStyles] = useState(BoardPageStyles);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  // Define the initial screen position
  const [translateX, setScreenXPosition] = useState(-250);
  const [translateY, setScreenYPosition] = useState(-140);
  const [activeNoteId, setActiveNoteId] = useState(null);

  // Language options
  const text = {
    English: {
      resetBoard: "Reset Board?",
      newNote: "New note.",
    },
    Finnish: {
      resetBoard: "Tyhjennä",
      newNote: "Uusi muistiinpano.",
    }
  };

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

      // Sets the page theme
      getTheme((rows) => {
        if (rows.length > 0) {
          if (rows[0].theme === "Light") {
            setThemeStyles(BoardPageStyles);
          } else {
            setThemeStyles(BoardPageStylesDark);
          }
        }
      });

      // Sets the page language
      getLanguage((rows) => {
        if (rows.length > 0) {
          if (rows[0].language === "English") {
            setCurrentLanguage("English");
          } else {
            setCurrentLanguage("Finnish");
          }
        }
      });
    }
  }, [isFocused]);

  return (
    // Keyboard closed when user clicks on background
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* Gesture panning container and handler */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={(event) => boardPanning(event, setScreenXPosition, setScreenYPosition)}>
          {/* The page content container */}
          <View style={themeStyles.container}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setActiveNoteId(null)}
            >
              {/* The board container */}
              <View
                style={[
                  themeStyles.boardContainer, {/* Initial Screen position */ },
                  { transform: [{ translateX }, { translateY }] },
                ]}
                onStartShouldSetResponder={() => {
                  setActiveNoteId(null);
                  Keyboard.dismiss();
                  return false;
                }}
              >
                <View style={themeStyles.resetBoardContainer}>
                  <Text style={themeStyles.resetBoardButton}
                    onPress={() => {
                      deleteAllNotes()
                        .then(() => {
                          updateList();
                        })
                    }}>
                    {text[currentLanguage].resetBoard}
                  </Text>
                </View>
                <Text style={themeStyles.centerOfBoard}>+</Text>
                {/* Notes returned to the board */}
                {notes.map((note, index) => (
                  <PanGestureHandler
                    key={note.id}
                    onGestureEvent={(event) => {
                      moveNote(event, note.id, notes, setNotes),
                        setActiveNoteId(note.id)
                    }}
                  >
                    {/* Note attributes */}
                    <View
                      style={[
                        themeStyles.noteContainer,
                        { left: note.x, top: note.y },
                        (activeNoteId === note.id) && themeStyles.activeNoteContainer
                      ]}
                    >
                      <TextInput
                        style={[
                          themeStyles.noteTextInput,
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
        {/* Fixed buttons */}
        <View style={themeStyles.addNoteContainer}>
          <Ionicons.Button
            name="md-add-circle-sharp"
            size={30}
            style={themeStyles.addNoteButton}
            onPress={() => {
              insertNote(`${text[currentLanguage].newNote}`, 290, 320)
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
            <View style={themeStyles.deleteNoteContainer}>
              <Ionicons.Button
                name="trash"
                size={30}
                style={themeStyles.deleteNoteButton}
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