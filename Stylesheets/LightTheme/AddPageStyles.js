import { StyleSheet } from 'react-native';

const AddPageStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    justifyContent: 'center',
    paddingLeft: 15,
    width: 60,
  },
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
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
    color: 'grey'
  },
  inputBox: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

export default AddPageStyles;