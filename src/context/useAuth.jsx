import { useContext } from "react";
import { AuthContext } from "./AuthContext";

//Hook used for accessing authentication context
export function useAuth() {
  //Access the current AuthContext value
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}