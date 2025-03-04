import { randomBytes } from "crypto";
import { auth } from "./auth";
export const isEmptyString = (value: string): boolean => {
  return value === "" ? true : false;
};

export const getFirstLetter = (value: string): string => {
  return value.slice(0, 1);
};

export const generateOTP = (): { otp: number; expiresAt: Date } => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
  return {
    otp,
    expiresAt,
  };
};

export const generateRandomPassword = (): string => {
  const length = 10;
  const randomBytesArray = randomBytes(length);
  return Array.from(randomBytesArray, (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2)
  )
    .join("")
    .substring(0, length);
};

export const isRestrictionOver = (
  restrictedDate: Date,
  restricted: boolean
): boolean => {
  if (!restricted) return false;

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return restrictedDate <= fiveMinutesAgo;
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const session = await auth();
  return session && session.user ? true : false;
};
