import { APP_STRINGS } from "@/app/common/magic-strings";
import { generateOTP } from "@/lib/helper";
import { mailOptions, transporter } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { emailSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = emailSchema.safeParse(body);
  const { email } = body;
  const { otp, expiresAt } = generateOTP();

  if (!validation.success) {
    const error = validation.error.errors.map((error) => error.message);
    return NextResponse.json(
      { error: error },
      {
        status: APP_STRINGS.STATUS_CODES.BAD_REQUEST,
      }
    );
  }
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExist)
      return NextResponse.json(
        {
          error: APP_STRINGS.ERRORS.COMMON.USER_NOT_FOUND,
        },
        {
          status: APP_STRINGS.STATUS_CODES.NOT_FOUND,
        }
      );
    const otpObj = await prisma.otp.upsert({
      where: { email: email },
      update: { otp, expiresAt, attempts: 0, changePassword: false },
      create: { email, otp, expiresAt, changePassword: false },
    });

    const subject =
      APP_STRINGS.NODEMAILER.TEMPLATES.FORGOT_PASSWORD_OTP.SUBJECT;
    const html = APP_STRINGS.NODEMAILER.TEMPLATES.FORGOT_PASSWORD_OTP.BODY(otp);
    const mail = mailOptions(email, subject, html);

    await transporter.sendMail(mail);
    return NextResponse.json(
      {
        message: APP_STRINGS.EMAIL_NOTIFICATION.SUCCESS,
        restricted: otpObj.restricted,
        restrictedDate: otpObj.restrictedDate,
      },
      { status: APP_STRINGS.STATUS_CODES.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `${APP_STRINGS.ERRORS.COMMON.SOMETHING_WENT_WRONG} ${error}`,
      },
      {
        status: APP_STRINGS.STATUS_CODES.NOT_FOUND,
      }
    );
  }
}
