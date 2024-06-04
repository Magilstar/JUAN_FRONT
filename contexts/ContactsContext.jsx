import React, { createContext, useState, useEffect, useContext } from "react";
import { CONSTANTS } from "../constans";
import FetchManager from "../FetchManager";
import { AuthContext } from "./AuthContext";
import { LoadContext } from "./LoadContext";

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const { session } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);

  useEffect(() => {
    if (session.token) {
      fetchContacts();
    }
  }, [session.token]);

  const fetchContacts = async () => {
    try {
      const { token } = session;
      const URL = `${CONSTANTS.API_URL_CONTACTS}/get/allUser`;
      setIsLoading(true);
      const data = await FetchManager({ url: URL, token });
      setContacts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
