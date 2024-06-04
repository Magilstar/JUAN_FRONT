import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useModal } from "../hooks/useModal";
import { MaterialIcons } from '@expo/vector-icons'; 

const CustomModal = ({ isVisible, message, type = "success" }) => {
  const { toggleModal } = useModal();
  const borderColor = type === "success" ? "green" : "red";
  const iconName = type === "success" ? "check-circle" : "error";

  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ 
          backgroundColor: 'black', 
          padding: 30, 
          borderRadius: 10, 
          borderWidth: 2, 
          borderColor: borderColor,
          width: '90%',
          alignItems: "center"
        }}>
          <MaterialIcons name={iconName} size={48} color={borderColor} />
          <Text style={{ color: "white", fontSize: 24, marginTop: 20, marginBottom: 20 }}>{message}</Text>
          <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;