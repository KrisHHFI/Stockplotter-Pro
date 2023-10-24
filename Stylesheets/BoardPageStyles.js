import { StyleSheet } from 'react-native';

const BoardPageStyles = StyleSheet.create({
  addNoteContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  addNoteButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    height: 60,
    width: 60,
    paddingRight: 0,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  deleteNoteContainer: {
    position: 'absolute',
    top: 70,
    right: 5,
  },
  deleteNoteButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
    height: 60,
    width: 60,
    paddingRight: 0,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  boardContainer: {
    backgroundColor: '#fff1c9',
    borderColor: 'black',
    borderWidth: 15,
    height: 800,
    margin: 30,
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
    backgroundColor: '#fff',
    flex: 1,
  },
  noteContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    position: 'absolute',
  },
  noteTextInput: {
    //backgroundColor: 'red', //For testing
    flex: 1,
    textAlign: 'center',
    width:150,
    height: 90,
  },
});

export default BoardPageStyles;