import { Text, View } from "react-native";
import Logo from "../components/Logo";
import StyleButton from "../components/StyleButton";

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 30 }}>
      <View
        style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}
      >
        <Logo />
      </View>

      <View style={{ flex: 0.4 }}>
        <StyleButton color="white" textColor="#3d5a80" to={"login"}>
          Ingresar
        </StyleButton>

        <StyleButton >Registrarse</StyleButton>
      </View>
    </View>
  );
};

export default Main;
