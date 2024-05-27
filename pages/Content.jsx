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
import { MENU_OPTIONS } from "../constans";

// Importa los componentes de las páginas aquí
// import Profile from "./Profile";
// import Groups from "./Groups";
// import Register from "./Register";

const Content = () => {
  useBackHandler();
  const navigate = useNavigate();
  const { state, authContext } = useAuth();
  const { isLoading } = useContext(LoadContext);

  const menuOptions = MENU_OPTIONS({
    navigateFunct: navigate,
    context: authContext,
  });

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <StatusBar style="dark" backgroundColor="#000" />
      {isLoading ? (
        <Loader />
      ) : state.userToken ? (
        <NavigationBar menuOptions={menuOptions}>
          <Routes>
            <Route path="contacts" element={<Contacts />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            {/* <Route path="groups" element={<Groups />} /> */}
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
