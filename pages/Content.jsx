import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Routes, Route, Navigate, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import Main from "./Main";
import Login from "./Login";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import ContactOne from "../components/ContactOne";
import Groups from "./Groups";
import NavigationBar from "../components/NavigationBar";
import Loader from "../components/Loader";
import useBackHandler from "../hooks/useBackHook";
import { MENU_OPTIONS } from "../constans";
import { LoadContext } from "../contexts/LoadContext";
import { AuthContext } from "../contexts/AuthContext";
import AddGroup from "./AddGroup";

const Content = () => {
  useBackHandler();
  const { isLoading } = useContext(LoadContext);
  const { session, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuOptions = MENU_OPTIONS({ navigateFunct: navigate, signOut });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#000" />
      {isLoading && <Loader style={styles.loader} />}
      {session.isSession && session.token !== null ? (
        <NavigationBar menuOptions={menuOptions}>
          <Routes>
            <Route path="contacts" element={<Contacts />} />
            <Route path="addContact" element={<AddContact />} />
            <Route path="groups" element={<Groups />} />
            <Route path="contactOne/:id" element={<ContactOne />} />
            <Route path="addGroup" element={<AddGroup />} />
            <Route path="*" element={<Navigate to="/contacts" />} />
          </Routes>
        </NavigationBar>
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
});
