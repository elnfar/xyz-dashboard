import { auth } from "@/auth"

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/") {
      const newUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
  })
export const config = {
  matcher: [
    // Match all paths except those starting with api, _next/static, _next/image, and favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};