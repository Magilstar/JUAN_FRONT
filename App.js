import { NativeRouter } from "react-router-native";
import { AuthProvider } from "./contexts/AuthContext";
import Content from "./pages/Content";
import { LoadProvider } from "./contexts/LoadContext";

const App = () => {
  return (
    <AuthProvider>
      <LoadProvider>
        <NativeRouter>
          <Content />
        </NativeRouter>
      </LoadProvider>
    </AuthProvider>
  );
};

export default App;
