import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const host = request.headers.get("host") || "";
  const isAdminSubdomain = host.startsWith("admin.");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/login";

  const searchParams = request.nextUrl.searchParams.toString();
  const pathWithoutAdmin = request.nextUrl.pathname.replace(/^\/admin/, "");
  const path = `${pathWithoutAdmin}${searchParams ? `?${searchParams}` : ""}`;

  // Redirect non-admin subdomain `/admin` routes to the admin subdomain
  if (!isAdminSubdomain && isAdminRoute) {
    const adminHost = `admin.${host.replace("www.", "")}`;
    return NextResponse.redirect(
      new URL(
        `${request.nextUrl.protocol}//${adminHost}${path === "/" ? "/" : path}`,
        request.url
      )
    );
  }

  // Handle authentication for admin routes
  if (isAdminSubdomain) {
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";
    const adminHostname = `admin.${rootDomain}`;

    // Rewrite all requests for the admin subdomain
    if (host.startsWith(adminHostname)) {
      return NextResponse.rewrite(
        new URL(`/admin${path === "/" ? "/" : path}`, request.url)
      );
    }

    // Redirect authenticated users on the login route to the admin panel
    if (isLoginRoute && token) {
      const callbackUrl =
        request.nextUrl.searchParams.get("callbackUrl") || "/admin";
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
