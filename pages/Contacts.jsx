import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ContactComponent from "../components/ContactComponent";
import { FAB } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { ContactsContext } from "../contexts/ContactsContext";

const Contacts = () => {
  const { contacts } = useContext(ContactsContext);
  const navigate = useNavigate();

  let sortedContacts = [];
  let groupedContacts = {};

  if (contacts && contacts.length > 0) {
    sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

    groupedContacts = sortedContacts.reduce((groups, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
      return groups;
    }, {});
  }

  const handleAddContact = () => navigate("/addContact");

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.keys(groupedContacts).length === 0 ? (
          <Text style={styles.message}>
            No contacts, press the button to start saving numbers!
          </Text>
        ) : (
          Object.entries(groupedContacts).map(([letter, contacts], index) => (
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
          ))
        )}
      </ScrollView>
      <FAB style={styles.fab} small icon="plus" onPress={handleAddContact} />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  message: {
    fontSize: 20, // Aumenta el tamaño de la fuente
    color: "#fff",
    textAlign: "center",
    margin: 20, // Añade margen alrededor para darle más espacio
    padding: 10, // Añade padding para darle más espacio interno
    borderRadius: 10, // Añade bordes redondeados
    backgroundColor: '#171718', // Añade un fondo oscuro
  },
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
