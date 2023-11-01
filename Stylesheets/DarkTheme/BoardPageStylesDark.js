import { StyleSheet } from 'react-native';

const BoardPageStylesDark = StyleSheet.create({
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
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    height: 60,
    width: 60,
    paddingRight: 0,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  resetBoardButton: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  resetBoardContainer: {
    backgroundColor: 'red',
    right: -20,
    position: 'absolute',
    top: 1020,
    borderRadius: 10, 
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
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 15,
    height: 800,
    margin: 30,
    width: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerOfBoard: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '100',
  },
  container: { // Page body
    backgroundColor: 'black',
    flex: 1,
    borderColor: 'gold',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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

export default BoardPageStylesDark;