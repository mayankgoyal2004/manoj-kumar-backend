// Mock client for standalone UI operation without external Base44 backend
export const base44 = {
  auth: {
    hasToken: () => true,
    me: async () => ({
      id: "usr_admin_1",
      full_name: "Prof. (Dr.) Manoj Kumar",
      email: "vc@davuniversity.org",
      role: "Super Admin",
    }),
    loginViaEmailPassword: async () => ({ success: true }),
    register: async () => ({ success: true }),
    verifyOtp: async () => ({ access_token: "mock_token" }),
    resendOtp: async () => ({ success: true }),
    resetPasswordRequest: async () => ({ success: true }),
    resetPassword: async () => ({ success: true }),
    setToken: () => {},
    logout: () => {},
    redirectToLogin: (returnTo) => {
      if (typeof window !== "undefined") window.location.href = returnTo || "/";
    },
    loginWithProvider: () => {},
  },
  entities: {},
};
