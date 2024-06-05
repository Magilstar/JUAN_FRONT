import { NativeRouter } from "react-router-native";
import { AuthProvider } from "./contexts/AuthContext";
import Content from "./pages/Content";
import { LoadProvider } from "./contexts/LoadContext";
import { ContactsProvider } from "./contexts/ContactsContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ModalProvider } from "./contexts/ModalContext";
import { GroupsProvider } from "./contexts/GroupsContext";

const App = () => {
  return (
    <AuthProvider>
      <LoadProvider>
        <SidebarProvider>
          <NativeRouter>
            <ModalProvider>
              <GroupsProvider>
                <ContactsProvider>
                  <Content />
                </ContactsProvider>
              </GroupsProvider>
            </ModalProvider>
          </NativeRouter>
        </SidebarProvider>
      </LoadProvider>
    </AuthProvider>
  );
};

export default App;
