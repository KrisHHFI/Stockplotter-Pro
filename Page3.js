import { StyleSheet, Text, View } from 'react-native';
import styles from './Styles'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page3() {
  return (
    <View style={styles.container}>
      <Text>Cork Board</Text>
      <Ionicons.Button name="md-add-circle-sharp" size={24} color="black" />
    </View>
  );
}