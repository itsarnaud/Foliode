import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "./utils/serverJwtUtils";

export function middleware(request: NextRequest) {
  const authCookie = getDecodedToken(request);

  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authCookie.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/portfolio/edit"],
};
