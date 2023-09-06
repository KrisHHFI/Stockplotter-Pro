import { StyleSheet } from 'react-native';

const homeScreenstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    marginLeft: "5%",
  },
  flatListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listSeparator: {
    height: 5,
    width: "80%",
    backgroundColor: "#fff",
    marginLeft: "10%",
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