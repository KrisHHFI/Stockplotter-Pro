import { StyleSheet } from 'react-native';

const BoardPageStylesDark = StyleSheet.create({
  activeNoteContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  addNoteButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    height: 60,
    justifyContent: 'center',
    paddingRight: 0,
    width: 60,
  },
  addNoteContainer: {
    right: 5,
    top: 5,
    position: 'absolute',
  },
  boardContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 15,
    height: 800,
    justifyContent: 'center',
    margin: 30,
    width: 800,
  },
  centerOfBoard: {
    color: 'white',
    fontSize: 50,
    fontWeight: '100',
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: 'gold',
    borderTopWidth: 1,
    flex: 1,
  },
  deleteNoteButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
    height: 60,
    justifyContent: 'center',
    paddingRight: 0,
    width: 60,
  },
  deleteNoteContainer: {
    position: 'absolute',
    right: 5,
    top: 70,
  },
  noteContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
  },
  noteTextInput: {
    borderColor: '#e3e3e3',
    borderWidth: 0.5,
    flex: 1,
    height: 90,
    textAlign: 'center',
    width: 125,
  },
  resetBoardButton: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  resetBoardContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    right: -20,
    top: 1020,
    position: 'absolute',
  },
});

export default BoardPageStylesDark;