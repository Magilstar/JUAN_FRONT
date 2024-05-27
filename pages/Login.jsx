import { View, Alert, Button } from "react-native";
import Logo from "../components/Logo";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import StyleButton from "../components/StyleButton";
import { loginValidation } from "../validations/login";
import FetchManager from "../FetchManager";
import { useNavigate } from "react-router-native";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import { LoadContext } from "../contexts/LoadContext";
import { CONSTANTS } from "../constans";

const Login = () => {
  const initial = { email: "", password: "" };
  const navigate = useNavigate();
  const { authContext } = useAuth();
  const { isLoading, setIsLoading } = useContext(LoadContext);

  const onSubmitLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await FetchManager({
        url: CONSTANTS.API_URL_LOGIN,
        method: "POST",
        body: values,
      });

      console.log(response);

      if (response.token) {
        Alert.alert("Login Successful");
        authContext.signIn(response.token);
        navigate("contacts");
      } else {
        Alert.alert("Login Failed");
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 30 }}>
      <View
        style={{ flex: 0.55, justifyContent: "center", alignItems: "center" }}
      >
        <Logo />
      </View>

      <View style={{ flex: 0.45, justifyContent: "start" }}>
        <Formik
          validationSchema={loginValidation}
          initialValues={initial}
          onSubmit={onSubmitLogin}
        >
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

              <StyleButton onPress={handleSubmit} disabled={isLoading}>
                Login
              </StyleButton>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;