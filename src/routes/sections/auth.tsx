import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "@/components/loading-screen";

import { GuestGuard } from "@/auth/guard";
import AuthLayout from "@/layouts/AuthLayout";

// ----------------------------------------------------------------------

const SignInPage = lazy(() => import("@/pages/auth/jwt/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/jwt/sign-up"));

const authJwt = {
  path: "",
  children: [
    {
      path: "sign-in",
      element: (
        <GuestGuard>
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: "sign-up",
      element: (
        <GuestGuard>
          <AuthLayout>
            <SignUpPage />
          </AuthLayout>
        </GuestGuard>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: "auth",
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];
