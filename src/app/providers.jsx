import AuthProvider from "../context/AuthProvider";

//Provider
export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}