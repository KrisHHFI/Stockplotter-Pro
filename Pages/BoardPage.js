import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function BoardPage() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);

  // Runs every time page is viewed
  useEffect(() => {
    if (isFocused) {
      console.log("Cork Board page active");
    }
  }, [isFocused]);

  // Add a note to the Board
  const addNote = () => {
    console.log("Add note function called");

    const newNote = {
      id: notes.length + 1,
      text: "New Note.",
      x: 350,
      y: 370,
    };
    setNotes([...notes, newNote]);
  }

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

  return (
    <View style={BoardPageStyles.container}>
      <ScrollView contentOffset={{ y: 120 }}>
        <ScrollView horizontal={true} contentOffset={{ x: 250 }}>
          <View style={BoardPageStyles.boardContainer}>{/* The board */}
            <Text style={BoardPageStyles.centerOfBoard}>+</Text>{/* The center of the board */}
            {notes.map((note, index) => (
              <TextInput
                style={[
                  BoardPageStyles.note,
                  { left: note.x, top: note.y },
                ]}
                key={note.id}
                value={note.text}
                onChangeText={(text) => changeNote(text, note.id)}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <View style={BoardPageStyles.addNoteContainer}>
        <Ionicons.Button name="md-add-circle-sharp" size={24} color="black" onPress={() => addNote()} />
      </View>
    </View>
  );
}