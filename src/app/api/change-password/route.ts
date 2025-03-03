import { APP_STRINGS } from "@/app/common/magic-strings";
import { prisma } from "@/lib/prisma";
import { changePwSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = changePwSchema.safeParse(body);
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
    const { oldPassword, newPassword, email } = body;
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!findUser) {
      return NextResponse.json(
        { error: APP_STRINGS.ERRORS.COMMON.USER_NOT_FOUND },
        {
          status: APP_STRINGS.STATUS_CODES.BAD_REQUEST,
        }
      );
    }
    const isPasswordsMatch = await bcrypt.compare(
      oldPassword,
      findUser.hashedPassword!
    );
    if (!isPasswordsMatch) {
      return NextResponse.json(
        { error: APP_STRINGS.ERRORS.COMMON.INVALID_CREDENTIAL },
        {
          status: APP_STRINGS.STATUS_CODES.BAD_REQUEST,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword,
      },
    });
    if (!updatedUser) {
      return NextResponse.json(
        {
          error:
            APP_STRINGS.ERRORS.COMMON
              .SOMETHING_WENT_WRONG_WITH_CREDENTIALS_UPDATING,
        },
        {
          status: APP_STRINGS.STATUS_CODES.NOT_FOUND,
        }
      );
    }
    return NextResponse.json(APP_STRINGS.SUCCESS.COMMON.PASSWORD_CHANGED, {
      status: APP_STRINGS.STATUS_CODES.OK,
    });
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
