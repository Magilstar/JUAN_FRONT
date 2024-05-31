import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import GroupComponent from "../components/GroupComponent";
import FetchManager from "../FetchManager";
import { CONSTANTS } from "../constans";
import { AuthContext } from "../contexts/AuthContext";
import { FAB } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { LoadContext } from "../contexts/LoadContext";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { session } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);
  const navigate = useNavigate();

  let sortedGroups = [];
  let groupedGroups = {};

  if (groups && groups.length > 0) {
    sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));

    // Group the groups by the first letter of the name
    groupedGroups = sortedGroups.reduce((groups, group) => {
      const firstLetter = group.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(group);
      return groups;
    }, {});
  }

  useEffect(() => {
    const handleFetchInit = async () => {
      try {
        const { token } = session;
        const URL = `${CONSTANTS.API_URL_GROUPS}/get/user`;
        setIsLoading(true);
        const data = await FetchManager({ url: URL, token });
        setGroups(data);
      } catch (error) {
        Alert.alert(JSON.stringify(error));
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchInit();
  }, []);

  const handleAddGroup = () => navigate("/addGroup");

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.entries(groupedGroups).map(([letter, groups]) => (
          <View key={letter}>
            <Text style={styles.letter}>{letter}</Text>
            <View style={styles.group}>
              {groups.map((group) => (
                <View key={group.id}>
                  <GroupComponent group={group} />
                  {group !== groups[groups.length - 1] && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB style={styles.fab} small icon="plus" onPress={handleAddGroup} />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  group: {
    backgroundColor: "#171718",
    borderRadius: 20,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 4,
  },
  letter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  separator: {
    height: 0.6,
    backgroundColor: "#fff",
    marginLeft: 60,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
