import {NextRequest, NextResponse} from "next/server";
import {jwtDecode} from "jwt-decode";
import {User} from "@/interfaces/User";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token_auth")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const authCookie: User = jwtDecode(token);

    if (authCookie.exp * 1000 < Date.now()) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/dashboard/:path*", "/portfolio/edit"],
};