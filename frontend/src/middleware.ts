
import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('token_auth');

    // if (!authCookie) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
