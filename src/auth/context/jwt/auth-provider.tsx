import { useMemo, useEffect, useCallback } from "react";

import { useSetState } from "../../../hooks/use-set-state";

import axios, { endpoints } from "@/utils/api";

import { STORAGE_KEY } from "./constant";
import { AuthContext } from "../auth-context";
import { setSession, isValidToken } from "./utils";

import type { AuthState } from "../../types";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axios.get(endpoints.auth.profile);

        const { data: user } = res;

        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? "admin",
          }
        : null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
