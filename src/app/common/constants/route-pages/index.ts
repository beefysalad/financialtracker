export const ROUTES = {
  ROOT: "/",
  AUTH: {
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    API_AUTH_SIGN_IN: "/api/auth/signin",
    FORGOT_PASSWORD: "/forgot-password",
  },
  USER: "/user",
};

export const PROTECTED_ROUTES = [ROUTES.USER];

export const PUBLIC_ROUTES = [
  ROUTES.AUTH.SIGN_IN,
  ROUTES.AUTH.SIGN_UP,
  ROUTES.AUTH.API_AUTH_SIGN_IN,
];
