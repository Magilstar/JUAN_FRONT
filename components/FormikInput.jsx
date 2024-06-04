import React, { useState, useCallback, useMemo } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from "react-native";
import { useField } from "formik";
import Icon from "react-native-vector-icons/Ionicons";

const FormikInput = ({
  name,
  placeholder,
  type = "text",
  keyboardType = "default",
  style = {},
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [secureTextEntry, setSecureTextEntry] = useState(type === "password");

  const handleEyePress = useCallback(() => {
    setSecureTextEntry((prevState) => !prevState);
  }, []);

  const inputStyle = useMemo(
    () => ({ ...styles.textInput, ...style }),
    [style]
  );
  const containerStyle = useMemo(
    () => [styles.container, meta.error && styles.errorContainer],
    [meta.error]
  );

  return (
    <Animated.View style={containerStyle}>
      <View
        style={{ flexDirection: "row", width: "100%", position: "relative" }}
      >
        <TextInput
          placeholderTextColor="#ccc"
          placeholder={placeholder}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          onChangeText={(value) => helpers.setValue(value)}
          secureTextEntry={secureTextEntry}
          style={inputStyle}
          keyboardType={keyboardType} // Modifica esta línea
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={handleEyePress}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: [{ translateY: -10 }],
            }}
          >
            <Icon
              color="white"
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>

      {meta.touched && meta.error && (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.errorText}>{meta.error}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "start",
  },
  errorContainer: {
    borderColor: "red",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default FormikInput;