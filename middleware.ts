import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  // if (isAdminRoute && !isLoginRoute && !token) {
  //   const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
  //   return NextResponse.redirect(
  //     new URL(
  //       `/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  //       request.url
  //     )
  //   );
  // }

  if (isLoginRoute && token) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
