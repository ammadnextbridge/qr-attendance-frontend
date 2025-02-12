import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "@/components/loading-screen";


// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import("@/pages/error/404"));
const PrivacyPolicy = lazy(() => import("@/pages/privacyPolicy/privacyPolicy"));
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "404", element: <Page404 /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> }, // New Privacy Policy route
    ],
  },
];