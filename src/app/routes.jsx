import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import { RequireAuth, RequireAdmin } from "./RouteGuards";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProfilePage from "../features/auth/pages/ProfilePage";
import BrowsePage from "../features/items/pages/BrowsePage";
import NotFound from "../components/NotFound";

// Admin pages
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminItemsPage from "../features/admin/pages/AdminItemsPage";
import AdminClaimsPage from "../features/admin/pages/AdminClaimsPage";

// Set router basename to Vite's BASE_URL so routes work when the app is served from a subfolder
export const router = createBrowserRouter(
  [
    { path: "/login", element: <LoginPage /> }, //Accessible without authentication
    { path: "/register", element: <RegisterPage /> }, //Accessible without authentication

  {
    path: "/",
    element: <AppLayout />,
    children: [
      { //Protected under requiring authentication
        index: true,
        element: (
          <RequireAuth>
            <BrowsePage />
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFound /> }, /* Catches any undefined routes*/ 
    ],
  },
]);