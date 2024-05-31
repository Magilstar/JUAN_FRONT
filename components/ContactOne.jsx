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
import StyleButton from "./StyleButton";
import { LoadContext } from "../contexts/LoadContext";

function ContactOne() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [groups, setGroups] = useState(null);
  const { session } = useContext(AuthContext);
  const {setIsLoading} = useContext(LoadContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const URL = `${CONSTANTS.API_URL_CONTACTS}/getContact/${id}`;
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
      setIsLoading(true)
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
    }finally{
      setIsLoading(false)
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
  emoveNumberField = (index) => {
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
            </View>

            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1 }}>
                {contact.phone &&
                  contact.phone.map((number, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: "row", width: "100%" }}
                    >
                      <View style={{}}>
                        <FormikInput
                          name={`phone[${index}]`}
                          style={styles.input}
                        />
                      </View>
                      <View style={{}}>
                        {index !== 0 && (
                          <Icon
                            name="remove-circle-outline"
                            size={30}
                            style={styles.icon}
                            onPress={() => removeNumberField(index)}
                          />
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{}}>
                <Icon
                  name="add-circle-outline"
                  size={30}
                  style={styles.icon}
                  onPress={addNumberField}
                />
              </View>
            </View>

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
                    size={30}
                    style={styles.icon}
                    onPress={() => removeGroup(group.id)}
                  />
                </View>
              ))}
            <View style={styles.buttonContainer}>

              <StyleButton onPress={handleSubmit}>Update</StyleButton>
              <StyleButton onPress={deleteContact} color="red">Delete</StyleButton>

            </View>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#171718",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10,
  },
  icon: {
    marginTop: 15,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 10,
    paddingRight: 15,
    color: "#fff",
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
    borderRadius: 45,
  },
});

export default ContactOne;
