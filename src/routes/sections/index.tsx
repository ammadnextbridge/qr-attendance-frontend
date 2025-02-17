import { Navigate, useRoutes } from "react-router-dom";

import { authRoutes } from "./auth";
import { mainRoutes } from "./main";
import { dashboardRoutes } from "./dashboard";
import { CONFIG } from "@/config-global";

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
