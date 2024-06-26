import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-native";
import addGroupSchema from "../validations/addGroup";
import StyleButton from "../components/StyleButton";
import { LoadContext } from "../contexts/LoadContext";
import DropDownPicker from "react-native-dropdown-picker";
import { intersection } from "lodash";
import { useModal } from "../hooks/useModal";
import { GroupsContext } from "../contexts/GroupsContext";
import Icon from "react-native-vector-icons/Ionicons";

function GroupOne() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const { session } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const { showModal } = useModal();
  const { updateGroup, deleteGroup } = useContext(GroupsContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await FetchManager({
          url: `${CONSTANTS.API_URL_CONTACTS}/get/allUser`,
          method: "GET",
          token: session.token,
        });

        setContacts(response || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    setItems(
      contacts.map((contact) => {
        return { label: contact.name, value: contact.id };
      })
    );
  }, [contacts]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const URL = `${CONSTANTS.API_URL_GROUPS}/getGroup/${id}`;
        const response = await FetchManager({
          url: URL,
          method: "GET",
          token: session.token,
        });

        setGroup(response);

        const groupContactIds = response.contacts;
        const allContactIds = contacts.map((contact) => contact.id);
        const selectedContactIds = intersection(allContactIds, groupContactIds);

        setValue(selectedContactIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupData();
  }, [contacts]);

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      contacts: value,
      groupId: id,
    };

    try {
      setIsLoading(true);
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_GROUPS}/update`,
        method: "PUT",
        token: session.token,
        body: newValues,
      });

      updateGroup(response); // Update the group in the context

      showModal(`Group updated ${response.name}`);
      navigate("/groups");
    } catch (error) {
      showModal("Error updating the group", "error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGroupHandler = async () => {
    try {
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_GROUPS}/delete/${id}`,
        method: "DELETE",
        token: session.token,
      });

      deleteGroup(id);

      showModal(`Group deleted ${response.name}`);
      navigate("/groups");
    } catch (error) {
      showModal("Error deleting the group", "error");
      console.log(error);
    }
  };

  if (!group) {
    return null;
  }

  return (
    <View style={styles.container}>
      
      <Icon name="people-outline" size={110} style={{marginHorizontal: "auto", marginBottom: 20, color:"#fff"}} />
      
      <Formik initialValues={group} onSubmit={onSubmit}>
        {({ handleSubmit, setFieldValue }) => (
          <View>
            <View style={{ flexDirection: "column" }}>
              <FormikInput
                name="name"
                style={{ ...styles.input, width: "100%" }}
              />
            </View>

            <DropDownPicker
              theme="DARK"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              min={0}
              max={100}
              searchable={true}
              onChangeItem={(item) => setFieldValue("contacts", item.value)}
              searchablePlaceholder="Search for an item"
              searchableError={() => <Text>Not Found</Text>}
              style={{width: "95%", marginHorizontal: "auto"}}
            />

            <View style={styles.buttonContainer}>
              <StyleButton onPress={handleSubmit} style={styles.button}>
                Update
              </StyleButton>

              <StyleButton
                onPress={deleteGroupHandler}
                color="red"
                style={styles.button}
              >
                Delete Group
              </StyleButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "start",
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
    width: "80%",
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
  button: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});

export default GroupOne;
