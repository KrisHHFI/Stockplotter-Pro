import { StyleSheet } from 'react-native';

const homeScreenstyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  placeholderCenter: {
    position: "absolute", 
    top: 0, left: 0, bottom: 0, right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    marginLeft: "2.5%",
  },
  flatListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listSeparator: {
    height: 6,
    width: "85%",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 8,
  },
  companyText: {
    fontSize: 18
  },
  expandButton: {
    backgroundColor: 'blue',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  buttonFont: {
    fontSize: 18,
    color: 'white',
  },
});

export default homeScreenstyles;