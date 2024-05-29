import { View } from "react-native";
import { Routes, Route, Navigate, useNavigate } from "react-router-native";
import Main from "./Main";
import Login from "./Login";
import useBackHandler from "../hooks/useBackHook";
import Contacts from "./Contacts";
import Constants from "expo-constants";
import NavigationBar from "../components/NavigationBar";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import Loader from "../components/Loader";
import { LoadContext } from "../contexts/LoadContext";
import { AuthContext } from "../contexts/AuthContext";
import { MENU_OPTIONS } from "../constans";
import AddContact from "./AddContact";
import ContactOne from "../components/ContactOne";

// Importa los componentes de las páginas aquí
// import Profile from "./Profile";
// import Groups from "./Groups";
// import Register from "./Register";

const Content = () => {
  useBackHandler();
  const { isLoading } = useContext(LoadContext);
  const { session, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuOptions = MENU_OPTIONS({ navigateFunct: navigate, signOut });

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <StatusBar style="dark" backgroundColor="#000" />
      {isLoading ? (
        <Loader />
      ) : session.isSession && session.token !== null ? (
        <NavigationBar menuOptions={menuOptions}>
          <Routes>
            <Route path="contacts" element={<Contacts />} />
            <Route path="addContact" element={<AddContact />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            {/* <Route path="groups" element={<Groups />} /> */}
            <Route path="contactOne">
              <Route path=":id" element={<ContactOne />} />
            </Route>
            <Route path="*" element={<Navigate to="/contacts" />} />
          </Routes>
        </NavigationBar>
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </View>
  );
};

export default Content;
