const API_URL_BASE = `http://192.168.3.106:8010`;

export const CONSTANTS = {
  API_URL_AUTH: `${API_URL_BASE}/auth`,
  API_URL_LOGIN: `${API_URL_BASE}/auth/login`,
  API_URL_REGISTER: `${API_URL_BASE}/auth/register`,
  API_URL_CONTACTS: `${API_URL_BASE}/contacts`,
};

export const MENU_OPTIONS = ({navigateFunct, context}) => [
  {
    label: "Contacts",
    path: "/contacts",
    action: () => navigateFunct("/contacts"),
  },
  {
    label: "Logout",
    path: "/logout",
    action: () => context.signOut(),
  },
];
