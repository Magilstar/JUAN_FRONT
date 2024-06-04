import React, { useState, useEffect, useContext } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-native";
// import updateProfileSchema from "../validations/updateProfile";
import { LoadContext } from "../contexts/LoadContext";
import StyleButton from "../components/StyleButton";
import { useModal } from "../hooks/useModal";

function Profile() {
  const { session, signOut } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const URL = `${CONSTANTS.API_URL_AUTH}/get`;
        const response = await FetchManager({
          url: URL,
          method: "GET",
          token: session.token,
        });

        setUser(response.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_AUTH}/delete`,
        method: "DELETE",
        token: session.token,
      });

      showModal("Account deleted", "success");
      // Alert.alert(JSON.stringify(response));
      signOut();
      navigate("/login");
    } catch (error) {
      showModal("An error occurred", "error");
      // Alert.alert(JSON.stringify(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await FetchManager({
        url: `${CONSTANTS.API_URL_AUTH}/update`,
        method: "PUT",
        token: session.token,
        body: values,
      });

      showModal("Profile updated", "success");
      // Alert.alert(JSON.stringify(response));

      navigate("/profile");
    } catch (error) {
      showModal("An error occurred", "error");
      // Alert.alert(JSON.stringify(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        // validationSchema={updateProfileSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <View style={styles.row}>
              <FormikInput name="email" style={styles.input} />
            </View>

            <View style={styles.row}>
              <FormikInput
                name="password"
                style={styles.input}
                secureTextEntry
                placeholder={"Your new password"}
              />
            </View>

            <View style={styles.buttonContainer}>
              <StyleButton onPress={handleSubmit}>Update</StyleButton>
              <StyleButton onPress={deleteAccount} color="red">
                Delete
              </StyleButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#171718",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
    borderRadius: 45,
  },
});

export default Profile;
