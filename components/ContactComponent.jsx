import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigate } from "react-router-native";

const ContactComponent = ({ contact}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${contact.number}`);
  };

  const handleText = () => {
    Linking.openURL(`sms:${contact.number}`);
  };

  const navegar = () =>{
    const URL_TO_NAVIGATE = `/contactOne/${contact.id}`
    console.log(URL_TO_NAVIGATE)
    navigate(URL_TO_NAVIGATE)
  }

  return (
    <View>
      <TouchableOpacity style={styles.contact} onPress={toggleExpanded}>
        <Icon name="person-circle-outline" size={50} color="#fff" />
        <Text style={styles.name}>{contact.name}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={navegar}
          >
            <Icon name="information-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleText}>
            <Icon name="chatbubble-ellipses-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleCall}>
            <Icon name="call-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ContactComponent;

const styles = StyleSheet.create({
  contact: {
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
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  menuItem: {
    marginStart: 60,
    flex: 1,
    paddingTop: 10,
    marginBottom: 10,
  },
});
