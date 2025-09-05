import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const response = await fetch(
        // ⚠️ Use 127.0.0.1 instead of localhost for Edge runtime, or deploy URL
        "http://127.0.0.1:5000/api/v1/users/validate-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        // Clone headers (immutable otherwise)
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user", JSON.stringify(data.user));

        return NextResponse.next({
          request: { headers: requestHeaders },
        });
      }

      if (response.status === 400) {
        return NextResponse.redirect(
          new URL("/login?error=missing_token", req.url)
        );
      }

      if (response.status === 401) {
        return NextResponse.redirect(
          new URL("/login?error=invalid_token", req.url)
        );
      }

      return NextResponse.redirect(
        new URL("/login?error=server_error", req.url)
      );
    } catch (err) {
      console.error("Middleware error:", err);
      return NextResponse.redirect(
        new URL("/login?error=network_error", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
  runtime: "nodejs", // 👈 ensure fetch works with localhost
};
