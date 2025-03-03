export const APP_STRINGS = {
  UI: {
    COMMON: { EMAIL: "Email Address" },
    LOGIN: {
      NO_ACCOUNT: "Don't have an account?",
      FORGET_PASSWORD: "Forgot your password?",
      LOGIN_BUTTON: "Log in",
      WELCOME_MESSAGE: "Welcome back",
      SIGNING_IN_LOADING: "Signing in",
      CONTINUE_WITH: "Or continue with",
      GOOGLE: "Google",
      EMAIL: "Email",
      PASSWORD: "Password",
    },
    SIGN_UP: {
      SIGNING_UP: "Signing Up",
      SIGN_UP_BUTTON: "Sign Up",
      SIGN_UP_BUTTON_LOADING: "Signing up",
      ALREADY_HAVE_AN_ACCOUNT: "Already have an account?",
      SIGN_IN: "Sign in",
      NAME: "Name",
      EMAIL: "Email",
      PASSWORD: "Password",
    },
    PROFILE_DROPDOWN: {
      SETTINGS: "Settings",
      PROFILE: "Profile",
      LOGOUT: "Log out",
    },
    FORGET_PASSWORD: {
      MULTISTEP_FORM: {
        STEPS: {
          STEP_ONE: {
            TITLE: "Enter your email",
            DESCRRIPTION: "We'll send a verification code to your email",
          },
          STEP_TWO: {
            TITLE: "Verify Your Identity",
            DESCRRIPTION: "Enter the 6-digit code sent to your email",
          },
          STEP_THREE: {
            TITLE: "Update Password",
            DESCRRIPTION: "Create a new password for your account",
          },
          STEP_FOUR: {
            TITLE: "Success",
            DESCRRIPTION: "Your password has been updated successfully",
          },
        },
        STEPPER: {
          STEP_ONE: "Email",
          STEP_TWO: "Verify",
          STEP_THREE: "Password",
        },
        BUTTON: {
          OTP_CONTINUE: "Continue",
          OTP_LOADING: "Sending OTP",
          VERIFY: "Verify",
          VERIFY_LOADING: "Verifying",
          BACK: "Back",
          RESEND: "Resend",
          CHANGE_PASSWORD: "Update Password",
          CHANGE_PASSWORD_LOADING: "Updating Password",
          DONE: "Done",
        },
        TEXT: {
          NO_CODE: "Didn't receive a code? ",
          CHANGE_PW_SUCCESS:
            "Your password has been successfully updated. You can now log in with your new password.",
        },
      },
    },
  },
  ERRORS: {
    COMMON: {
      INVALID_CREDENTIAL: "Invalid Credentials",
      SOMETHING_WENT_WRONG: "Something went wrong",
      SOMETHING_WENT_WRONG_WITH_CREDENTIALS_CHECKING:
        "Something went wrong while checking your credentials. Please try again.",
      SOMETHING_WENT_WRONG_WITH_CREDENTIALS_UPDATING:
        "Something went wrong while updating your credentials. Please try again.",
      USER_NOT_FOUND: "User not found",
      COULD_NOT_PARSE_CREDS: "Could not parse credentials",
      MISMATCH_OTP: "Inputted OTP is invalid!",
      OTP_LIMIT: "Too many invalid attempts! Please try again after 5 minutes.",
      CHANGE_PASSWORD_FAILED:
        "Something went wrong. We couldn't change your password",
      REQUIRED_EMAIL: "Email is required",
      RESTRICTED: "Restricted",
      OLD_PASWORD_REQUIRED: "Current Password is required",
      PASSWORD_REQUIRED: "Password is required",
    },
    VALIDATION: {
      INVALID_EMAIL: "Please provide a valid email address.",
      PASSWORD_TOO_SHORT: "Password must be at least 4 characters long.",
      EXISTING_USER: "User with that email address already exists!",
      INVALID_OTP: "Please enter a valid 6-digit code",
    },
  },
  EMAIL_NOTIFICATION: {
    SUCCESS: "Email sent successfully",
  },
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
  NODEMAILER: {
    SERVICE: "gmail",
    TEMPLATES: {
      FORGOT_PASSWORD_OTP: {
        SUBJECT: "Forgot Password - OTP Request",
        BODY: (
          otp: number
        ) => `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; background-color: #111111; padding: 20px; border-radius: 8px;">
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; text-align: center; margin-bottom: 16px;">Password Reset OTP</h1>
        <p style="font-size: 16px; color: #ffffff; line-height: 1.5; text-align: center;">
          We received a request to reset your password. To proceed, please use the following One-Time Password (OTP):
        </p>
        <div style="text-align: center; margin-top: 5px;">
          <h2 style="font-size: 30px; color: #ffffff; font-weight: 700; padding: 11px 22px; background-color: #222222; border-radius: 8px; display: inline-block;">
            ${otp}
          </h2>
        </div>
        <p style="font-size: 14px; color: #ffffff; margin-top: 10px; text-align: center;">
          This OTP is valid for 10 minutes. Please use it to reset your password. <br />
          If you did not request a password reset, please ignore this email.
        </p>
        <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #888;">
          <p>&copy; 2025 PTRCKK.DEV. All rights reserved.</p>
        </footer>
      </div>`,
      },
      PASSWORD_UPDATED: {
        SUBJECT: "Forget Password - New Password",
        BODY: (
          name: string,
          password: string
        ) => `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; background-color: #111111; padding: 20px; border-radius: 8px;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; text-align: center; margin-bottom: 16px;">Your Password Has Been Reset</h1>
          <p style="font-size: 16px; color: #ffffff; line-height: 1.5; text-align: center;">
            Hi ${name},<br />
            We are writing to inform you that your password has been successfully reset. If you did not request a password reset, please contact our support team immediately.
          </p>
           <div style="text-align: center;">
          <h2 style="font-size: 30px; color: #ffffff; font-weight: 700; padding: 11px 22px; background-color: #222222; border-radius: 8px; display: inline-block;">
            ${password}
          </h2>
        </div>
          <p style="font-size: 14px; color: #ffffff; margin-top: 10px; text-align: center;">
            If you need further assistance, feel free to reach out to us at any time. <br />
            Stay secure!
          </p>
          <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #888;">
            <p>&copy; 2025 PTRCKK.DEV. All rights reserved.</p>
          </footer>
        </div>`,
      },
    },
  },
  SUCCESS: {
    COMMON: {
      VALIDATED_OTP: "Success! OTP provided is valid",
      PASSWORD_CHANGED: "You have successfully changed your password",
      PASSWORD_CHANGED_EMAIL:
        "Password has been changed! Please check your email",
      SUCCESS: "Success",
    },
  },
};
