import React, { useRef } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
});

const StyleButton = ({
  to,
  onPress,
  color = "#3d5a80",
  textColor = "white",
  children,
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const ButtonContent = (
    <Animated.View
      style={[styles.button, { backgroundColor: color, opacity: fadeAnim }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </Animated.View>
  );

  if (to) {
    return (
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Link to={to}>{ButtonContent}</Link>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      {ButtonContent}
    </TouchableWithoutFeedback>
  );
};

export default StyleButton;
