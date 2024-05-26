import React, { useState, useCallback, useMemo } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { useField } from "formik";
import Icon from "react-native-vector-icons/Ionicons";

const FormikInput = ({
  name,
  placeholder,
  type = "text",
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
      <TextInput
        placeholderTextColor="#ccc"
        placeholder={placeholder}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
        {...props}
      />
      {type === "password" && (
        <TouchableOpacity onPress={handleEyePress}>
          <Icon
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
            size={20}
          />
        </TouchableOpacity>
      )}
      {meta.touched && meta.error && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
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
  },
  errorText: {
    color: "red",
    marginTop: -15,
    marginLeft: 10,
  },
});

export default FormikInput;
