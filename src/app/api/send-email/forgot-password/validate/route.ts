import { APP_STRINGS } from "@/app/common/magic-strings";
import { isRestrictionOver } from "@/lib/helper";
import { prisma } from "@/lib/prisma";
import { otpSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

//TODO: PROPER HANDLING FOR WHEN RESTRICTION IS OVER, FOR NOW IT IS NOT STRICTLY IMPLEMENTED
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
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [otpValid, _] = await prisma.$transaction([
      // find email and otp combination
      prisma.otp.findFirst({
        where: {
          email,
        },
      }),
      //update the otp attempt count for rate limiting controls
      prisma.otp.updateMany({
        where: {
          email,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      }),
    ]);

    if (otpValid?.attempts && otpValid?.attempts > 6) {
      if (otpValid?.restricted && otpValid.restrictedDate) {
        if (isRestrictionOver(otpValid.restrictedDate, otpValid.restricted)) {
          await prisma.otp.update({
            where: {
              email,
            },
            data: {
              restricted: false,
              restrictedDate: null,
              attempts: 0,
            },
          });
        }
      } else {
        await prisma.otp.update({
          where: {
            email,
          },
          data: {
            restricted: true,
            restrictedDate: new Date(),
          },
        });
        return NextResponse.json(
          { error: APP_STRINGS.ERRORS.COMMON.OTP_LIMIT },
          { status: APP_STRINGS.STATUS_CODES.UNAUTHORIZED }
        );
      }
    }

    if (otpValid?.otp !== Number(otp)) {
      return NextResponse.json(
        { error: APP_STRINGS.ERRORS.COMMON.MISMATCH_OTP },
        { status: APP_STRINGS.STATUS_CODES.NOT_FOUND }
      );
    }

    await prisma.otp.update({
      where: {
        email: email,
      },
      data: {
        changePassword: true,
      },
    });
    return NextResponse.json(APP_STRINGS.SUCCESS.COMMON.VALIDATED_OTP, {
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
