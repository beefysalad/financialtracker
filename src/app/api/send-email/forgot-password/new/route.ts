import { APP_STRINGS } from "@/app/common/magic-strings";
import { generateRandomPassword } from "@/lib/helper";
import { prisma } from "@/lib/prisma";
import { otpSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mailOptions, transporter } from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = otpSchema.safeParse(body);
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
    const { otp, email } = body;
    const changePassword = await prisma.otp.findFirst({
      where: {
        email,
        otp: Number(otp),
      },
    });
    if (!changePassword) {
      return NextResponse.json(
        { error: APP_STRINGS.ERRORS.COMMON.CHANGE_PASSWORD_FAILED },
        {
          status: APP_STRINGS.STATUS_CODES.BAD_REQUEST,
        }
      );
    }
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    if (changePassword && changePassword.changePassword) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          hashedPassword,
        },
      });

      const subject = APP_STRINGS.NODEMAILER.TEMPLATES.PASSWORD_UPDATED.SUBJECT;
      const html = APP_STRINGS.NODEMAILER.TEMPLATES.PASSWORD_UPDATED.BODY(
        updatedUser.name!,
        password
      );
      const mail = mailOptions(email, subject, html);
      transporter.sendMail(mail);

      await prisma.otp.delete({
        where: {
          email,
          otp: Number(otp),
        },
      });

      return NextResponse.json(
        APP_STRINGS.SUCCESS.COMMON.PASSWORD_CHANGED_EMAIL,
        {
          status: APP_STRINGS.STATUS_CODES.OK,
        }
      );
    }
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
