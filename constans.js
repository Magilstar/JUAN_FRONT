const API_URL_BASE = `http://192.168.3.106:8010`;

export const CONSTANTS = {
  API_URL_AUTH: `${API_URL_BASE}/auth`,
  API_URL_LOGIN: `${API_URL_BASE}/auth/login`,
  API_URL_REGISTER: `${API_URL_BASE}/auth/register`,
  API_URL_CONTACTS: `${API_URL_BASE}/contacts`,
  API_URL_GROUPS: `${API_URL_BASE}/groups`,
};

export const MENU_OPTIONS = ({ navigateFunct, signOut }) => [
  {
    label: "Contacts",
    path: "/contacts",
    action: () => navigateFunct("/contacts"),
  },
  {
    label: "Groups",
    path: "/groups",
    action: () => navigateFunct("/groups"),
  },
  {
    label: "Profile",
    path: "/profile",
    action: () => navigateFunct("/profile"),
  },
  {
    label: "Logout",
    path: "/logout",
    action: () => signOut(),
  },
  {
    label: "Add Contact",
    path: "/addContact",
  },
  {
    label: "Edit Contact",
    path: "/contactOne/:id",
  },
  {
    label: "Add Group",
    path: "/addGroup",
  },
  {
    label: "Edit Group",
    path: "/groupOne/:id",
  },
  {
    label: "Register",
    path: "/register",
  },
];
