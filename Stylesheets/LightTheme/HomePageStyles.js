import { StyleSheet } from 'react-native';

const HomePageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
  },
  placeholderCenter: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  text: {
    color: 'black',
  },
  flatList: {
    width: '100%',
  },
  flatListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e3e3e3',
    borderWidth: 0.5,
    padding: 10,
  },
  flatListItemButtons: {
    justifyContent: 'space-between',
    height: '100%',
  },
  listSeparator: {
    height: 6,
    width: "85%",
  },
  image: {
    height: 100,
    width: 100,
  },
  companyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  expandButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    flex: 4,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    padding: 0,
    paddingLeft: 5,
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
  buttonFont: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomePageStyles;