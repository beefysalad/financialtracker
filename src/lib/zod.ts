import { APP_STRINGS } from "@/app/common/magic-strings";
import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .email({ message: APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL }),
  password: z
    .string()
    .min(4, { message: APP_STRINGS.ERRORS.VALIDATION.PASSWORD_TOO_SHORT }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: APP_STRINGS.ERRORS.VALIDATION.INVALID_OTP })
    .refine((value) => value.length > 0, { message: "OTP is required." }),
  email: z
    .string()
    .email({ message: APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL })
    .refine((value) => value.length > 0, { message: "OTP is required." }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL }),
});

export const changePwSchema = z.object({
  email: z
    .string()
    .email({ message: APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL })
    .refine((value) => value.length > 0, { message: "OTP is required." }),
  oldPassword: z
    .string()
    .min(4, { message: APP_STRINGS.ERRORS.VALIDATION.PASSWORD_TOO_SHORT }),
  newPassword: z
    .string()
    .min(4, { message: APP_STRINGS.ERRORS.VALIDATION.PASSWORD_TOO_SHORT }),
});
