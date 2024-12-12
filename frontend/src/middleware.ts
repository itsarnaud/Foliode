
import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('token_auth');

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
