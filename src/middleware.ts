import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import authConfig from './auth.config';


const { auth } = NextAuth(authConfig);


export default auth((req) => {
  const { nextUrl } = req;
 
  const isAuthenticated = !!req.auth;

  console.log(isAuthenticated);
  
  if (!isAuthenticated)
    return Response.redirect(new URL('/api/auth/signin', nextUrl));

 });
 
 export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
 };


// const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
// // if(!token) {
// //   return NextResponse.redirect(new URL('/api/auth/signin', req.url));    
// // }

// if (token && req.nextUrl.pathname === '/api/auth/signin') {
//   return NextResponse.redirect(new URL('/', req.url));
// }
