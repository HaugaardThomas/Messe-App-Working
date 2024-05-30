import { useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const BottomSheet = ({ isVisible, onClose, children }) => {
    

  const windowHeight = Dimensions.get("window").height;

  const sheetHeight = windowHeight * 1; 
  const minSheetHeight = windowHeight * 0.7; 

  const [sheetPosition] = useState(new Animated.Value(minSheetHeight));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
        const newSheetPosition = gestureState.moveY - minSheetHeight;
    
        if (newSheetPosition >= 0 && newSheetPosition <= sheetHeight - minSheetHeight) {
          sheetPosition.setValue(newSheetPosition);
        }
      },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(sheetPosition, {
        //   toValue: 450, // Adjust this value based on your needs // On release if gestureState.dy is greater than 160 (dragged down below 160 pixel) it will go back up to 450
        toValue: sheetHeight - minSheetHeight,
        duration: 300,
          useNativeDriver: false,
        }).start(onClose);
      } else {
        Animated.timing(sheetPosition, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: sheetPosition.interpolate({
                inputRange: [0, sheetHeight - minSheetHeight], 
                outputRange: [0, sheetHeight - minSheetHeight],
                extrapolate: "clamp",
              }),
            },
          ],
        },
      ]}
    >
      {/* <TouchableOpacity onPress={onClose} style={styles.overlay} /> */}
      <View {...panResponder.panHandlers} style={styles.sheet}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default BottomSheet;