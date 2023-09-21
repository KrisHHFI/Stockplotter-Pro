import { StyleSheet } from 'react-native';

const AddPageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageSection: {
    flex: 1,
    alignItems: 'center',
  },
  pageSubSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageSubSectionGroup: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default AddPageStyles;