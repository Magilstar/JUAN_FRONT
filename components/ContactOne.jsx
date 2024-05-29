import React, { useState, useEffect, useContext } from "react";
import { View, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import Icon from "react-native-vector-icons/Ionicons";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-native";
import addContactSchema from "../validations/addContact";

function ContactOne() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [groups, setGroups] = useState(null);
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const URL = `${CONSTANTS.API_URL_CONTACTS}/getContact/${id}`;
        console.log(URL);
        const response = await FetchManager({
          url: URL,
          method: "GET",
          token: session.token,
        });

        setContact(response.contact);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGroupData = async () => {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_GROUPS}/getGroups/${id}`,
        method: "GET",
        token: session.token,
      });
      setGroups(Array.isArray(response) ? response : []);
    };

    fetchContactData();
    fetchGroupData();
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_CONTACTS}/update`,
        method: "PUT",
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

  const deleteContact = async () => {
    try {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_CONTACTS}/delete/${id}`,
        method: "DELETE",
        token: session.token,
      });

      Alert.alert(JSON.stringify(response));

      navigate("/contacts");
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const removeGroup = async (groupId) => {
    try {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_GROUPS}/remove/${id}/${groupId}`,
        method: "DELETE",
        token: session.token,
      });

      Alert.alert(JSON.stringify(response));

      setGroups(groups.filter((group) => group.id !== groupId));
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const addNumberField = () => {
    setContact({ ...contact, phone: [...contact.phone, ""] });
  };

  const removeNumberField = (index) => {
    setContact({
      ...contact,
      phone: contact.phone.filter((_, i) => i !== index),
    });
  };

  if (!contact || !groups) {
    return null; // O puedes mostrar un componente de carga aquí
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={contact}
        onSubmit={onSubmit}
        validationSchema={addContactSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <View style={styles.row}>
              <FormikInput name="name" style={styles.input} />
              <Icon name="create-outline" size={24} style={styles.icon} />
            </View>
            {contact.phone &&
              contact.phone.map((number, index) => (
                <View key={index}>
                  <View style={styles.row}>
                    <FormikInput
                      name={`phone[${index}]`}
                      style={styles.input}
                    />
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="remove-circle-outline"
                        size={24}
                        style={styles.icon}
                        onPress={() => removeNumberField(index)}
                      />
                      {index === contact.phone.length - 1 && (
                        <Icon
                          name="add-circle-outline"
                          size={24}
                          style={styles.icon}
                          onPress={addNumberField}
                        />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            {groups &&
              groups.map((group) => (
                <View style={styles.row} key={group.id}>
                  <FormikInput
                    name="groups"
                    value={group.name}
                    style={styles.input}
                  />
                  <Icon
                    name="trash-outline"
                    size={24}
                    style={styles.icon}
                    onPress={() => removeGroup(group.id)}
                  />
                </View>
              ))}
            <Button
              title="Update"
              onPress={handleSubmit}
              style={styles.button}
            />
            <Button
              title="Delete"
              onPress={deleteContact}
              color="red"
              style={styles.button}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ContactOne;
