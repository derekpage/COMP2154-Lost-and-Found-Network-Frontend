import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

//This is the method that protects private routes, if the user isn't authenticated for specific pages it will redirect them to the login page
export function RequireAuth({ children }) {
  // TEMPORARY: bypass authentication for frontend development
  return children;
}