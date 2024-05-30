import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 4)", // semi-transparent background
    zIndex: 9999, // ensure the loader is always on top
    height: "100%"
  },
});