import { StyleSheet } from 'react-native';

const BoardPageStyles = StyleSheet.create({
  activeNoteContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
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
    //backgroundColor: 'red', //For testing
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
  },
  noteTextInput: {
    //backgroundColor: 'red', //For testing
    borderColor: '#e3e3e3',
    borderWidth: 0.5,
    flex: 1,
    textAlign: 'center',
    width:125,
    height: 90,
  },
});

export default BoardPageStyles;