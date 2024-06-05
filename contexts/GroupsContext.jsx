import React, { createContext, useState, useEffect, useContext } from "react";
import { CONSTANTS } from "../constans";
import FetchManager from "../FetchManager";
import { AuthContext } from "./AuthContext";
import { LoadContext } from "./LoadContext";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const { session } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadContext);

  useEffect(() => {
    if (session.token) {
      fetchGroups();
    }
  }, [session.token]);

  const fetchGroups = async () => {
    try {
      const { token } = session;
      const URL = `${CONSTANTS.API_URL_GROUPS}/get/user`;
      setIsLoading(true);
      const data = await FetchManager({ url: URL, token });
      setGroups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const updateGroup = (updatedGroup) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  const deleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  return (
    <GroupsContext.Provider
      value={{ groups, addGroup, updateGroup, deleteGroup }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
