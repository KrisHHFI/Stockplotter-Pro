import { StyleSheet, Text, View } from 'react-native';
import styles from '../stylesheets/Styles'
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

  return (
    <View style={styles.container}>
      <Text>Cork Board</Text>
      <Ionicons.Button name="md-add-circle-sharp" size={24} color="black" />
    </View>
  );
}