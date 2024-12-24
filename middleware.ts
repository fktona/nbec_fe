import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SUBDOMAIN = "admin";
const TESTIMONIAL_SUBDOMAIN = "testimonial";

function getSubdomain(host: string): string {
  return host.split(".")[0];
}

function removePrefix(path: string, prefix: string): string {
  return path.replace(new RegExp(`^${prefix}`), "");
}

function constructUrl(
  protocol: string,
  host: string,
  path: string,
  searchParams: string
): string {
  const baseUrl = `${protocol}//${host}${path}`;
  return searchParams ? `${baseUrl}?${searchParams}` : baseUrl;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";
  const host = request.headers.get("host") ?? "";
  const subdomain = getSubdomain(host);
  const { pathname, searchParams } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isTestimonialRoute = pathname.startsWith("/testimonial");
  const isLoginRoute = pathname === "/login";

  const headers = new Headers(request.headers);

  // Handle subdomain routing
  if (subdomain !== ADMIN_SUBDOMAIN && subdomain !== TESTIMONIAL_SUBDOMAIN) {
    if (isAdminRoute) {
      return redirectToSubdomain(
        request,
        ADMIN_SUBDOMAIN,
        removePrefix(pathname, "/admin")
      );
    }
    if (isTestimonialRoute) {
      return redirectToSubdomain(
        request,
        TESTIMONIAL_SUBDOMAIN,
        removePrefix(pathname, "/testimonial")
      );
    }
  }

  // Handle admin subdomain
  if (subdomain === ADMIN_SUBDOMAIN) {
    if (isLoginRoute && token) {
      const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
  }

  // Handle testimonial subdomain
  if (subdomain === TESTIMONIAL_SUBDOMAIN) {
    return NextResponse.rewrite(
      new URL(`/testimonial${pathname}`, request.url)
    );
  }

  return NextResponse.next({ headers });
}

function redirectToSubdomain(
  request: NextRequest,
  subdomain: string,
  path: string
): NextResponse {
  const host = request.headers.get("host") ?? "";
  const newHost = `${subdomain}.${host.replace(/^www\./, "")}`;
  const url = constructUrl(
    request.nextUrl.protocol,
    newHost,
    path,
    request.nextUrl.searchParams.toString()
  );
  return NextResponse.redirect(new URL(url));
}

export const config = {
  matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
