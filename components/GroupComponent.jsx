import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigate } from "react-router-native";

const GroupComponent = ({ group }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const URL_TO_NAVIGATE = `/groupOne/${group.id}`; 
    navigate(URL_TO_NAVIGATE);
  };

  return (
    <TouchableOpacity style={styles.group} onPress={handleNavigation}>
      <Icon name="people-outline" size={50} color="#fff" /> 
      <Text style={styles.name}>{group.name}</Text>
    </TouchableOpacity>
  );
};

export default GroupComponent;

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171718",
    padding: 4,
    borderRadius: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
    marginLeft: 10,
  },
});