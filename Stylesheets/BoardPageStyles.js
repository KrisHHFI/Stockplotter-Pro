import { StyleSheet } from 'react-native';

const BoardPageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 50, 
  }
});

export default BoardPageStyles;