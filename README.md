#  Stockplotter Pro

<img src="Stock-Plotter Promo Image.png" />

<br>

## About
- This mobile application was a university project, created in the autumn of 2023.
- Using this program, the user can search for US stocks via Polygon.io, which can then be saved and examined. <ins>The API permits 5 searches a minute.</ins>
- The user can also use a cork board to visualise their thoughts.
- A light/dark theme and English/Finnish language settings can be toggled.
- The users saved stocks, notes and preferences are saved to the device via data tables.
- The project was not continued after the course. However, the idea may be developed in a future project.
- Check out the [demo video](https://www.youtube.com/watch?v=bKQu5dr6vQ4).
<br>

## Features

### Find and Save US Companies

<img src="Stock-Plotter 1.gif" width="250"/>

### Cork Board

<img src="Stock-Plotter 2.gif" width="250"/>

### Light / Dark Theme

<img src="Stock-Plotter 3.gif" width="250"/>

### English / Finnish

<img src="Stock-Plotter 4.gif" width="250" />

<br>

## Get started
1. Install: Git, Node.js, Expo CLI, Expo Go (if you want to run it on your Android Device).
2. Create a free Polygon.io account and replace the "apiKey" variable value with your key (HomePage L20 & AddPage L27).
3. Download/clone the project to your system.
4. Navigate to the project via command line.
5. Then execute the command: npx expo start.
6. Then press "a" if you have a configured emulator running. Or, use mobile hotspot and run the Expo Go app.
### Note
- Ensure that your wifi is set to private to avoid errors. 
- The app is smoother and more enjoyable to use on an Android device.

<br>

## Installed Packages

Package  | What it is | Usage
------------- | ------------- | -------------
@babel/core@7.22.20  | Backwards compatibility | Across the app 
@react-navigation/bottom-tabs@6.5.8  | Native nav tabs | Nav bar
@react-navigation/native@6.1.7 | Native nav bar | Nav bar
expo-sqlite@11.3.3  | Database | Saved stocks, note content & location, settings
expo-status-bar@1.6.0  | Status bar (active page) | Across the app 
expo@49.0.11  | Debugging tools | When testing the app
react-native-gesture-handler@2.12.1 | Gesture handler | Cork board
react-native-reanimated@3.3.0  | Animations | Note movement
react-native-safe-area-context@4.6.3  | Device compatibility | Not used
react-native-screens@3.22.1  | optimization | Working in the background
react-native@0.72.6 | The projects main software framework | Across the app
react@18.2.0 | Software framework | Across the app
