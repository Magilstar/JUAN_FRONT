const API_URL_BASE = `http://192.168.3.106:8010`;

export const CONSTANTS = {
  API_URL_AUTH: `${API_URL_BASE}/auth`,
  API_URL_LOGIN: `${API_URL_BASE}/auth/login`,
  API_URL_REGISTER: `${API_URL_BASE}/auth/register`,
  API_URL_CONTACTS: `${API_URL_BASE}/contacts`,
  API_URL_GROUPS: `${API_URL_BASE}/groups`,
};

export const MENU_OPTIONS = ({navigateFunct, signOut}) => [
  {
    label: "Contacts",
    path: "/contacts",
    action: () => navigateFunct("/contacts"),
  },
  {
    label: "Logout",
    path: "/logout",
    action: () => signOut(),
  },
  {
    label: "Add Contact",
    path: "/addContact",
    action: () => navigateFunct("/addContact"),
  },
  {
    label: "Edit Contact",
    path: "/contactOne/:id",
    action: () => {}
  }
];
