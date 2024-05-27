import { useReducer, useEffect } from "react";
import { initialState, reducerAuth } from "../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [state, dispatch] = useReducer(reducerAuth, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async token => {
      // Persist the token using `AsyncStorage`
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'SIGN_IN', token });
    },
    signOut: async () => {
      // Clear the token from `AsyncStorage`
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SIGN_OUT' });
    },
    signUp: async token => {
      // Persist the token using `AsyncStorage`
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'SIGN_IN', token });
    },
  };

  return { authContext, state };
};