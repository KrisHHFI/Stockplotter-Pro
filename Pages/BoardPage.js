import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function Page3() {
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (isFocused) {
      console.log("Cork Board page active");
    }
  }, [isFocused]);

  const addNote = () => {
    console.log("Add note function called");
    setNotes([...notes, "New Note."]);
  }

  return (
    <View style={BoardPageStyles.container}>
      <ScrollView contentOffset={{ y: 100 }}>
        <ScrollView horizontal={true} contentOffset={{ x: 225 }}>
          <View style={BoardPageStyles.boardContainer}>{/* The board */}
            <Text style={BoardPageStyles.centerOfBoard}>+</Text>{/* The center of the board */}
            {notes.map((note, index) => (
              <Text style={BoardPageStyles.note}
                key={index}>{note}
              </Text>
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