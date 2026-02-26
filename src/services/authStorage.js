const TOKEN_KEY = "authToken"; //Keys used to store authentication data in LocalStorage
const USER_KEY = "authUser";

//This function saves authentication data to localStorage
export function setAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

//This function removes authentication data from localStorager (used during logout)
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

//Returns saved authentication token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

//Returns the saved user object from localStorage
export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}