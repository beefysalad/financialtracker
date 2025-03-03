import { AuthError } from "next-auth";

export class InvalidCredentialsError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
    this.message = message;
  }
}
