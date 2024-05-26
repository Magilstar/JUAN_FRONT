import { View, Alert, Button } from "react-native";
import Logo from "../components/Logo";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import StyleButton from "../components/StyleButton";

const Login = () => {
  const initial = { email: "", password: "" };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 30 }}>
      <View
        style={{ flex: 0.55, justifyContent: "center", alignItems: "center" }}
      >
        <Logo />
      </View>

      <View style={{ flex: 0.45, justifyContent: "start" }}>
        <Formik initialValues={initial} onSubmit={(v) => Alert.alert(JSON.stringify(v))}>
          {({ handleSubmit }) => (
            <View>
              <FormikInput
                name="email"
                placeholder="Email"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              />
              <FormikInput
                name="password"
                placeholder="Password"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                type="password"
              />

              <StyleButton onPress={handleSubmit}>Login</StyleButton>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
