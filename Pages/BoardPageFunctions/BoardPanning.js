import { Dimensions } from 'react-native';

// Enables the user to pan around the screen
export const boardPanning = (event, setScreenXPosition, setScreenYPosition) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // Page boundaries
    const pageXBoundary = windowWidth - 860;
    const pageYBoundary = windowHeight - 1250;
    // The X and Y gesture movement
    const { translationX, translationY } = event.nativeEvent;
    // How fast the user can pan around the screen
    const panningSpeed = 0.07;
    // New X and Y position, with panning speed applied
    const newXPosition = translationX * panningSpeed;
    const newYPosition = translationY * panningSpeed;
    // Set new position, with page boundaries considered
    setScreenXPosition((previousXPosition) => Math.min(0, Math.max(pageXBoundary, previousXPosition + newXPosition)));
    setScreenYPosition((previousYPosition) => Math.min(0, Math.max(pageYBoundary, previousYPosition + newYPosition)));
};