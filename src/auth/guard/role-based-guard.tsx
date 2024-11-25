// ----------------------------------------------------------------------

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks";
import { CONFIG } from "@/config-global";

export type RoleBasedGuardProp = {
  acceptRoles: string[];
  children: React.ReactNode;
};

export function RoleBasedGuard({ children, acceptRoles }: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  const currentRole = user?.role;

  if (!acceptRoles.includes(currentRole))
    return <Navigate to={CONFIG.auth.redirectPath} />;

  return <> {children} </>;
}
