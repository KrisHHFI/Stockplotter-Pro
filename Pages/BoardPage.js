import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
      <ScrollView>
        <ScrollView horizontal={true} >
          <View style={BoardPageStyles.boardContainer}>{/* The Board */}
            <Text>A note</Text>
          </View>
        </ScrollView>
      </ScrollView>
      <View style={BoardPageStyles.addButtonContainer}>
        <Ionicons.Button name="md-add-circle-sharp" size={24} color="black" onPress={() => addNote()} />
      </View>
    </View>
  );
}