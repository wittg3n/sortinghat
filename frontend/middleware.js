import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (
    token &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/login/") ||
      pathname.startsWith("/signup/"))
  ) {
    console.log("Redirecting to dashboard - user already logged in");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    console.log("Redirecting to login - no token for dashboard");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
