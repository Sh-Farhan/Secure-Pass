import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const publicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/';

  const token = request.cookies.get("token")?.value || "";

  if(publicPath && token){
    return NextResponse.redirect(new URL('/', request.url))
  }

  if(!publicPath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
    '/dashboard',
  ]
}