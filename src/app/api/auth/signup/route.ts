import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { schema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { APP_STRINGS } from "@/app/common/magic-strings";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

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
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: APP_STRINGS.ERRORS.VALIDATION.EXISTING_USER },
        { status: APP_STRINGS.STATUS_CODES.BAD_REQUEST }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        hashedPassword: hashedPassword,
      },
    });
    return NextResponse.json(
      { user },
      { status: APP_STRINGS.STATUS_CODES.CREATED }
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
