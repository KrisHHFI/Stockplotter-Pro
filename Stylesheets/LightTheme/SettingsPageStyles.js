import { StyleSheet } from 'react-native';

const SettingsPageStyles = StyleSheet.create({
  container: { // Page body
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  segment: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 125,
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    width: '100%',
  },
  segmentText: {
    fontSize: 25,
  },
  segmentButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
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
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFont: {
    fontSize: 18,
    color: 'black',
  },
});

export default SettingsPageStyles;