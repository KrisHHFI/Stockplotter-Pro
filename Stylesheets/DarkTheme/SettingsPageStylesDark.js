import { StyleSheet } from 'react-native';

const SettingsPageStylesDark = StyleSheet.create({
  container: { // Page body
    backgroundColor: 'black',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  segment: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 125,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    width: '100%',
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  segmentText: {
    color: 'white',
    fontSize: 25,
    paddingRight: 15,
  },
  segmentButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    height: 50,
    width: 50,
    paddingRight: 0,
    justifyContent: 'center', 
  },
  inactiveButton: {
    backgroundColor: 'grey',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  activeButton: {
    backgroundColor: 'gold',
    borderColor: 'black',
    borderWidth: 3,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonFont: {
    fontSize: 18,
    color: 'black',
  },
});

export default SettingsPageStylesDark;