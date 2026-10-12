import React, { createContext, useContext, useMemo, useState } from "react";
import { PROFILE } from "@/lib/DataStore";

const AuthContext = createContext(null);
const STORAGE_KEY = "academic_auth_session";
const LOGGED_OUT_KEY = "academic_logged_out";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return {
        id: "usr_admin_1",
        full_name: PROFILE.name,
        email: "admin@davuniversity.org",
        role: "Super Admin",
      };
    }
    const isLoggedOut = window.localStorage.getItem(LOGGED_OUT_KEY);
    if (isLoggedOut === "true") {
      return null;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        /* ignore parsing error */
      }
    }
    return {
      id: "usr_admin_1",
      full_name: PROFILE.name,
      email: "admin@davuniversity.org",
      role: "Super Admin",
    };
  });

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoadingAuth: false,
      authError: null,
      refresh: () => {},
      logout: () => {
        setUser(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(STORAGE_KEY);
          window.localStorage.setItem(LOGGED_OUT_KEY, "true");
        }
      },
      login: (credentials) => {
        const session = {
          id: "usr_admin_1",
          full_name: PROFILE.name,
          email: credentials?.email || "admin@davuniversity.org",
          role: "Super Admin",
        };
        setUser(session);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
          window.localStorage.removeItem(LOGGED_OUT_KEY);
        }
        return session;
      },
      navigateToLogin: () => {},
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      isAuthenticated: false,
      isLoadingAuth: false,
      authError: null,
      login: () => {},
      logout: () => {},
      refresh: () => {},
      navigateToLogin: () => {},
    };
  }
  return ctx;
}
