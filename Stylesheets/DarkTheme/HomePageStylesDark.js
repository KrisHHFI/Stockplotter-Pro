import { StyleSheet } from 'react-native';

const HomePageStylesDark = StyleSheet.create({
  buttonFont: {
    color: 'white',
    fontSize: 18,
  },
  companyText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'gold',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    paddingVertical: 20,
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
  expandButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    flex: 4,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  flatList: {
    width: '100%',
  },
  flatListItem: {
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  flatListItemButtons: {
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 100,
  },
  listSeparator: {
    height: 6,
    width: "85%",
  },
  placeholderCenter: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  text: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default HomePageStylesDark;