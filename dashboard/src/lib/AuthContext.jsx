import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { getAuthToken, setAuthToken } from "@/api/backendClient";

const AuthContext = createContext(null);
const STORAGE_KEY = "academic_auth_session";

export function AuthProvider({ children }) {
  // Never default to a fake user! If there is no token in localStorage, user is unauthenticated (null).
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const token = getAuthToken();
    if (!token) return null;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoadingAuth, setIsLoadingAuth] = useState(() => {
    if (typeof window === "undefined") return false;
    const token = getAuthToken();
    if (!token) return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return !stored;
  });
  const [authError, setAuthError] = useState(null);

  // Validate existing JWT token on mount
  useEffect(() => {
    let active = true;
    async function checkAuthSession() {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        setIsLoadingAuth(false);
        return;
      }

      try {
        const hasSession = Boolean(window.localStorage.getItem(STORAGE_KEY));
        if (!hasSession) {
          setIsLoadingAuth(true);
        }
        const me = await api.auth.me();
        if (active && me) {
          const session = {
            id: me.id,
            full_name: me.name,
            email: me.email,
            role: me.role,
            department: me.department,
            avatar: me.avatar,
          };
          setUser(session);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        }
      } catch (err) {
        console.warn("Session expired or invalid, redirecting to login:", err);
        setAuthToken(null);
        window.localStorage.removeItem(STORAGE_KEY);
        if (active) setUser(null);
      } finally {
        if (active) setIsLoadingAuth(false);
      }
    }

    checkAuthSession();

    // Listen to unauthorized event (401 from API) to immediately log out
    const handleUnauthorized = () => {
      setAuthToken(null);
      window.localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      active = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && getAuthToken()),
      isLoadingAuth,
      authError,
      updateUser: (patch) => {
        setUser((prev) => {
          const next = { ...(prev || {}), ...patch };
          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          }
          return next;
        });
      },
      refresh: async () => {
        try {
          const me = await api.auth.me();
          if (me) {
            const session = {
              id: me.id,
              full_name: me.name,
              email: me.email,
              role: me.role,
              department: me.department,
              avatar: me.avatar,
            };
            setUser(session);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
          }
        } catch {
          // ignore
        }
      },
      logout: () => {
        api.auth.logout();
        setUser(null);
        setAuthToken(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      },
      login: async (credentials) => {
        setIsLoadingAuth(true);
        setAuthError(null);
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          const res = await api.auth.login(email, password);
          const loggedUser = res?.user;
          const session = {
            id: loggedUser?.id,
            full_name: loggedUser?.name,
            email: loggedUser?.email,
            role: loggedUser?.role,
            department: loggedUser?.department,
            avatar: loggedUser?.avatar,
          };
          setUser(session);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
          }
          return session;
        } catch (err) {
          setAuthError(err.message);
          throw err;
        } finally {
          setIsLoadingAuth(false);
        }
      },
      navigateToLogin: () => {},
    }),
    [user, isLoadingAuth, authError],
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
      login: async () => {},
      logout: () => {},
      refresh: async () => {},
      navigateToLogin: () => {},
    };
  }
  return ctx;
}
