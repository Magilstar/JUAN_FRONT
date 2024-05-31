import { View, Alert, Button, Switch, Text, StyleSheet } from "react-native";
import Logo from "../components/Logo";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import StyleButton from "../components/StyleButton";
import { registerValidation } from "../validations/register";
import FetchManager from "../FetchManager";
import { useNavigate } from "react-router-native";
import { useContext, useState } from "react";
import { LoadContext } from "../contexts/LoadContext";
import { CONSTANTS } from "../constans";

const Register = () => {
  const initial = { email: "", password: "", confirmPassword: "" };
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoadContext);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const onSubmitRegister = async (values) => {
    if (!acceptTerms) {
      Alert.alert("You must accept the terms and conditions to register.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      Alert.alert("The passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await FetchManager({
        url: CONSTANTS.API_URL_REGISTER,
        method: "POST",
        body: values,
      });

      console.log(response)
     Alert.alert(`Register Success.`);
     navigate("/login");
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.formContainer}>
        <Formik
          validationSchema={registerValidation}
          initialValues={initial}
          onSubmit={onSubmitRegister}
        >
          {({ handleSubmit }) => (
            <View>
              <FormikInput
                name="email"
                placeholder="Email"
                style={styles.input}
              />
              <FormikInput
                name="password"
                placeholder="Password"
                style={styles.input}
                type="password"
              />
              <FormikInput
                name="confirmPassword"
                placeholder="Confirm Password"
                style={styles.input}
                type="password"
              />

              <View style={styles.termsContainer}>
                <Switch value={acceptTerms} onValueChange={setAcceptTerms} />
                <Text
                  style={styles.termsText}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  I accept the terms and conditions
                </Text>
              </View>

              <StyleButton onPress={handleSubmit} disabled={isLoading}>
                Register
              </StyleButton>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
      },
      logoContainer: {
        flex: 0.3, 
        justifyContent: "start",
        alignItems: "center",
      },
      formContainer: {
        flex: 0.7,
        justifyContent: "start",
        width: "100%",
      },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  termsText: {
    color: "white",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
});

export default Register;
