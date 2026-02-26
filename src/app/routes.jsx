import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import { RequireAuth } from "./RouteGuards";

import LoginPage from "../features/auth/pages/LoginPage";
import BrowsePage from "../features/items/pages/BrowsePage";
import NotFound from "../components/NotFound";

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
      { path: "*", element: <NotFound /> }, /* Catches any undefined routes*/ 
    ],
  },
]);