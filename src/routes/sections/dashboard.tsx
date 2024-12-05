import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { CONFIG } from "@/config-global";

import { LoadingScreen } from "@/components/loading-screen";

import { AuthGuard, RoleBasedGuard } from "@/auth/guard";
import MainLayout from "@/layouts/MainLayout";
import { ROLES } from "@/utils/constant";

// ----------------------------------------------------------------------

const ScanQRPage = lazy(() => import("@/pages/qr-code/index"));
const HomePage = lazy(() => import("@/pages/home/index"));
const UserListPage = lazy(() => import("@/pages/user/list"));

// ----------------------------------------------------------------------

const layoutContent = (
  <MainLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </MainLayout>
);

export const dashboardRoutes = [
  {
    path: "",
    element: CONFIG.auth.skip ? (
      <>{layoutContent}</>
    ) : (
      <AuthGuard>{layoutContent}</AuthGuard>
    ),
    children: [
      {
        element: (
          <RoleBasedGuard acceptRoles={[ROLES.ADMIN]}>
            <HomePage />
          </RoleBasedGuard>
        ),

        index: true,
      },
      {
        path: "scan",
        element: (
          <RoleBasedGuard acceptRoles={[ROLES.ADMIN, ROLES.USER]}>
            <ScanQRPage />
          </RoleBasedGuard>
        ),
      },
      {
        path: "users",
        element: (
          <RoleBasedGuard acceptRoles={[ROLES.ADMIN]}>
            <UserListPage />
          </RoleBasedGuard>
        ),
      },
    ],
  },
];
