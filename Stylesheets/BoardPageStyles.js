import { StyleSheet } from 'react-native';

const BoardPageStyles = StyleSheet.create({
  addNoteContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  boardContainer: {
    backgroundColor: '#fff1c9',
    borderColor: 'black',
    borderWidth: 15,
    height: 800,
    width: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerOfBoard: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '100',
  },
  container: { // Page body
    flex: 1,
    backgroundColor: '#fff',
  },
  note: {
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  }
});

export default BoardPageStyles;