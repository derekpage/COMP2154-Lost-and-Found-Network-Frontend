import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, getUser, clearAuth } from "../services/authStorage";
import * as authApi from "../features/auth/api/authApi";

//Provides global authentication state for the whole application
export default function AuthProvider({ children }) {
  //Initialize state from localStorage
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());

  const isAuthed = !!token && !!user; //Bool indicating if user is authenticated

  async function login(credentials) { //handles login  
    const { token: t, user: u } = await authApi.login(credentials);
    setToken(t);
    setUser(u);
  }

  async function logout() { //handles logout 
    await authApi.logout(); 
    clearAuth();
    //update react state
    setToken(null);
    setUser(null);
  }

  const value = useMemo( //Memorize context value 
    () => ({ token, user, isAuthed, login, logout }),
    [token, user, isAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}