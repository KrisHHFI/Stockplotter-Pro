import { StyleSheet } from 'react-native';

const AddPageStylesDark = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    paddingLeft: 15,
    width: 60,
  },
  buttonContainer: {

  },
  container: { // Page body
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pageSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: 'red', // Testing
  },
  pageSubSection: {
    flexDirection: 'row',
  },
  placeholderTextColor: {
    color: 'white'
  },
  inputBox: {
    width: 200,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

export default AddPageStylesDark;