import React, { useContext, useState } from "react";
import { View, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import Icon from "react-native-vector-icons/Ionicons";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-native";
import addContactSchema from "../validations/addContact";

const AddContact = () => {
  const { session } = useContext(AuthContext);
  const [phones, setPhones] = useState([""]);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
        console.log(values)
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_CONTACTS}/create`,
        method: "POST",
        token: session.token,
        body: values,
      });

      Alert.alert(JSON.stringify(response));

      navigate("/contacts");
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const addNumberField = () => {
    setPhones([...phones, ""]);
  };

  const removeNumberField = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ name: "", phone: phones }}
        onSubmit={onSubmit}
        validationSchema={addContactSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <View>
              <FormikInput
                name="name"
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
              />
            </View>
            {phones.map((_number, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ flex: 1 }}>
                  <FormikInput
                    name={`phone[${index}]`}
                    style={styles.input}
                    placeholder="+584262134235"
                    placeholderTextColor="#aaa"
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  {index !== 0 ? (
                    <Icon
                      name="remove-circle-outline"
                      size={24}
                      style={styles.icon}
                      onPress={() => removeNumberField(index)}
                    />
                  ) : (
                    <Icon
                      name="add-circle-outline"
                      size={24}
                      style={styles.icon}
                      onPress={addNumberField}
                    />
                  )}
                </View>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Button
                title="Create"
                onPress={handleSubmit}
                color="#007BFF"
                style={{ borderRadius: 50 }}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    height: 40,
    backgroundColor: "#171718",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10,
  },
  icon: {
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 10,
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 45,
  },
});

export default AddContact;
