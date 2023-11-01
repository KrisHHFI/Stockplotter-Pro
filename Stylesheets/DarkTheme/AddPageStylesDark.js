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
  container: { // Page body
    alignItems: 'center',
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: 'gold',
    borderTopWidth: 1,
    flex: 1,
    paddingVertical: 20,
  },
  inputBox: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    width: 200,
  },
  pageSection: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  pageSubSection: {
    flexDirection: 'row',
  },
  placeholderTextColor: {
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

export default AddPageStylesDark;