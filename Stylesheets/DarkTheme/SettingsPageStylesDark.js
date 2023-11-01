import { StyleSheet } from 'react-native';

const SettingsPageStylesDark = StyleSheet.create({
  activeButton: {
    alignItems: 'center',
    backgroundColor: 'gold',
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    padding: 5,
    width: 75,
  },
  buttonFont: {
    color: 'black',
    fontSize: 18,
  },
  container: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: 'gold',
    borderTopWidth: 1,
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  inactiveButton: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 5,
    justifyContent: 'center',
  },
  segment: {
    alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 125,
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    width: '100%',
  },
  segmentButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    paddingRight: 0,
    width: 50,
  },
  segmentText: {
    color: 'white',
    fontSize: 25,
  },
});

export default SettingsPageStylesDark;