import { NextResponse, type NextRequest } from "next/server";
import { detectLocale, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const savedLocale = request.cookies.get("haider-locale")?.value;
    const locale = isLocale(savedLocale)
      ? savedLocale
      : detectLocale(request.headers.get("accept-language"));
    const destination = request.nextUrl.clone();
    destination.pathname = `/${locale}`;
    const response = NextResponse.redirect(destination);
    response.headers.set("Vary", "Accept-Language, Cookie");
    return response;
  }

  const locale = pathname.split("/")[1];
  const requestHeaders = new Headers(request.headers);
  // Always replace incoming values; route segments are the source of truth.
  requestHeaders.set("x-haider-locale", isLocale(locale) ? locale : "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
