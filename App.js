import { NativeRouter } from "react-router-native";
import { AuthProvider } from "./contexts/AuthContext";
import Content from "./pages/Content";
import { LoadProvider } from "./contexts/LoadContext";
import { ContactsProvider } from "./contexts/ContactsContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ModalProvider } from "./contexts/ModalContext";

const App = () => {
  return (
    <AuthProvider>
      <LoadProvider>
        <ContactsProvider>
          <SidebarProvider>
            <NativeRouter>
              <ModalProvider>

              <Content />
              </ModalProvider>
            </NativeRouter>
          </SidebarProvider>
        </ContactsProvider>
      </LoadProvider>
    </AuthProvider>
  );
};

export default App;
