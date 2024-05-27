import { NativeRouter } from "react-router-native";
import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Content from "./pages/Content";
import { LoadProvider } from "./contexts/LoadContext";

const App = () => {
  const { authContext } = useAuth();

  return (
    <LoadProvider>
      <AuthContext.Provider value={authContext}>
        <NativeRouter>
          <Content />
        </NativeRouter>
      </AuthContext.Provider>
    </LoadProvider>
  );
};

export default App;
