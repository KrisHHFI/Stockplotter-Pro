import { StyleSheet } from 'react-native';

const BoardPageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    backgroundColor: '#fff1c9',
    borderColor: 'black',
    borderWidth: 10,
    height: 1000,
    width: 2000,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 50, 
  },
});

export default BoardPageStyles;