import { StyleSheet } from 'react-native';

const SettingsPageStyles = StyleSheet.create({
  container: { // Page body
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: 'grey',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  activeButton: {
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  buttonFont: {
    fontSize: 18,
    color: 'white',
  },
});

export default SettingsPageStyles;