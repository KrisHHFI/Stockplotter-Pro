import { StyleSheet, Text, View } from 'react-native';
import BoardPageStyles from '../Stylesheets/BoardPageStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function Page3() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("Cork Board page active");
    }
  }, [isFocused]);

  const addNote = () => {
    console.log("Add note function called");
  }

  return (
    <View style={BoardPageStyles.container}>

      <View style={BoardPageStyles.boardContainer}>
        {/* Content goes here */}
      </View>

      <View style={BoardPageStyles.addButtonContainer}>
        <Ionicons.Button name="md-add-circle-sharp" size={24} color="black" onPress={() => addNote()} />
      </View>
    </View>
  );
}