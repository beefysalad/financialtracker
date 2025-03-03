"use server";

import { ROUTES } from "@/app/common/constants/route-pages";
import { API } from "../app/common/constants/api-url";
import { ISignIn, ISignUp } from "../app/common/interfaces/user";
import { signIn, signOut } from "./auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { InvalidCredentialsError } from "@/lib/error";
import { APP_STRINGS } from "@/app/common/magic-strings";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const signUp = async (userData: ISignUp) => {
  try {
    const res = await fetch(`${API_URL}/${API.AUTH.SIGN_UP}`, {
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error(error);
  }
};

export const logIn = async () => {
  await signIn("google", { redirectTo: ROUTES.ROOT });
};

export const logOut = async () => {
  await signOut({ redirectTo: ROUTES.AUTH.SIGN_IN });
};

export const loginWithEmail = async ({ email, password }: ISignIn) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: ROUTES.ROOT,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    // Throw a custom error for invalid credentials
    if (error instanceof InvalidCredentialsError) {
      return APP_STRINGS.ERRORS.COMMON.INVALID_CREDENTIAL; // Error message for invalid login attempts
    }

    // General fallback error message
    return APP_STRINGS.ERRORS.COMMON
      .SOMETHING_WENT_WRONG_WITH_CREDENTIALS_CHECKING;
  }
};

export const getOtp = async (email: string) => {
  try {
    const res = await fetch(
      `${API_URL}/${API.SEND_EMAIL.FORGOT_PASSWORD.OTP}`,
      {
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error(error);
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const res = await fetch(
      `${API_URL}/${API.SEND_EMAIL.FORGOT_PASSWORD.VALIDATE}`,
      {
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error(error);
  }
};

export const sendNewPassword = async (email: string, otp: string) => {
  try {
    const res = await fetch(
      `${API_URL}/${API.SEND_EMAIL.FORGOT_PASSWORD.NEW}`,
      {
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await res.json();

    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error(error);
  }
};

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const res = await fetch(`${API_URL}/${API.CHANGE_PASSWORD}`, {
      body: JSON.stringify({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();

    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error(error);
  }
};
