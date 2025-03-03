import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
} from "./app/common/constants/route-pages";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();

  if (
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) &&
    !session
  ) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.SIGN_IN, request.url));
  }

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) && session) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, request.url));
  }
}
