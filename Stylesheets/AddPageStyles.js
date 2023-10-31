import { StyleSheet } from 'react-native';

const AddPageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  inputBox: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default AddPageStyles;