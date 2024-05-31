import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ContactComponent from "../components/ContactComponent";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { FAB } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { LoadContext } from "../contexts/LoadContext";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const { session } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);
  const navigate = useNavigate();

  let sortedContacts = [];
  let groupedContacts = {};

  if (contacts && contacts.length > 0) {
    sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

    // Agrupar los contactos por la primera letra del nombre
    groupedContacts = sortedContacts.reduce((groups, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
      return groups;
    }, {});
  }

  useEffect(() => {
    const handleFetchInit = async () => {
      try {
        const { token } = session;
        const URL = `${CONSTANTS.API_URL_CONTACTS}/get/allUser`;
        setIsLoading(true);
        const data = await FetchManager({ url: URL, token });
        setContacts(data);
      } catch (error) {
        Alert.alert(JSON.stringify(error));
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchInit();
  }, []);

  const handleAddContact = () => navigate("/addContact");

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.entries(groupedContacts).map(([letter, contacts], index) => (
          <View key={index}>
            <Text style={styles.letter}>{letter}</Text>
            <View style={styles.group}>
              {contacts.map((contact, index) => (
                <View key={contact.id}>
                  <ContactComponent contact={contact} />
                  {index < contacts.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB style={styles.fab} small icon="plus" onPress={handleAddContact} />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  group: {
    backgroundColor: "#171718",
    borderRadius: 20,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 4,
  },
  letter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  separator: {
    height: 0.6,
    backgroundColor: "#fff",
    marginLeft: 60,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
