import { View } from "react-native";
import { Routes, Route, useNavigate, Navigate } from "react-router-native";
import Main from "./Main";
import Login from "./Login";
import useBackHandler from "../hooks/useBackHook";
import Contacts from "./Contacts";
import Constants from "expo-constants";
import NavigationBar from "../components/NavigationBar";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import Loader from "../components/Loader";
import { LoadContext } from "../contexts/LoadContext";

const Content = () => {
  useBackHandler();
  const navigate = useNavigate();
  const { state, authContext } = useAuth();
  const { isLoading } = useContext(LoadContext);

  const menuOptions = [
    {
      label: "Contacts",
      path: "/contacts",
      action: () => navigate("/contacts"),
    },
    {
      label: "Logout",
      path: "/logout",
      action: () => authContext.signOut(),
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <StatusBar style="dark" backgroundColor="#000" />
      {isLoading ? (
        <Loader />
      ) : state.userToken ? (
        <NavigationBar menuOptions={menuOptions}>
          <Routes>
            <Route path="contacts" element={<Contacts />} />
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
