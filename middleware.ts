import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  if (token && (pathname === "/login" || pathname === "/register")) {
    url.pathname = "/";

    return NextResponse.redirect(url);
  }
}
