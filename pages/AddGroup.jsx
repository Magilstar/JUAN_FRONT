import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import Icon from "react-native-vector-icons/Ionicons";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-native";
import addGroupSchema from "../validations/addGroup.js";
import StyleButton from "../components/StyleButton";
import DropDownPicker from "react-native-dropdown-picker";
import { useModal } from "../hooks/useModal";
import { GroupsContext } from "../contexts/GroupsContext";

const AddGroup = () => {
  const { session } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  const { showModal } = useModal();
  const { addGroup } = useContext(GroupsContext);

  useEffect(() => {
    setItems(
      contacts.map((contact) => {
        return { label: contact.name, value: contact.id };
      })
    );
  }, [contacts]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_CONTACTS}/get/allUser`,
        method: "GET",
        token: session.token,
      });

      console.log(response);

      setContacts(response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const newValues = {
        ...values,
        contacts: value,
      };

      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_GROUPS}/create`,
        method: "POST",
        token: session.token,
        body: newValues,
      });

      addGroup(response);

      showModal(`Group created successfully ${response.name}`);
      navigate("/groups");
    } catch (error) {
      showModal("Error creating the group", "error");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ groupName: "", contacts: [] }}
        onSubmit={onSubmit}
        validationSchema={addGroupSchema}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <FormikInput
              name="groupName"
              style={styles.input}
              placeholder="Group Name"
              placeholderTextColor="#aaa"
            />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              min={0}
              max={10}
              searchable={true}
              onChangeItem={(item) => setFieldValue("contacts", item)}
              searchablePlaceholder="Search for an item"
              searchableError={() => <Text>Not Found</Text>}
            />
            <View style={styles.buttonContainer}>
              <StyleButton onPress={handleSubmit}>Create</StyleButton>
            </View>
          </>
        )}
      </Formik>
    </View>
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

export default AddGroup;
