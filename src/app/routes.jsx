import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import { RequireAuth, RequireAdmin } from "./RouteGuards";

import LoginPage from "../features/auth/pages/LoginPage";
import BrowsePage from "../features/items/pages/BrowsePage";
import NotFound from "../components/NotFound";

// Admin pages
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminItemsPage from "../features/admin/pages/AdminItemsPage";
import AdminClaimsPage from "../features/admin/pages/AdminClaimsPage";

//Application route configuration
export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> }, //Accessible without authentication

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
      
      // Admin-only routes
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/items",
        element: (
          <RequireAdmin>
            <AdminItemsPage />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/claims",
        element: (
          <RequireAdmin>
            <AdminClaimsPage />
          </RequireAdmin>
        ),
      },      


      { path: "*", element: <NotFound /> }, /* Catches any undefined routes*/ 
    ],
  },
]);