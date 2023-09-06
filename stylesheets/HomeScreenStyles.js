import { StyleSheet } from 'react-native';

const homeScreenstyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  deleteFont: {
    fontSize: 18,
    color: 'red',
  },
});

export default homeScreenstyles;