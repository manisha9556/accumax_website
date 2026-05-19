import { NextResponse }
from "next/server";

import { jwtVerify }
from "jose";

export async function middleware(req) {

  const token =
    req.cookies.get(
      "admin_token"
    )?.value;

  const { pathname } =
    req.nextUrl;

  // ALLOW LOGIN PAGE

  if (
    pathname ===
    "/admin/login"
  ) {

    return NextResponse.next();
  }

  // PROTECT ADMIN ROUTES

  if (
    pathname.startsWith(
      "/admin"
    )
  ) {

    // NO TOKEN

    if (!token) {

      return NextResponse.redirect(

        new URL(
          "/admin/login",
          req.url
        )
      );
    }

    try {

      // VERIFY TOKEN

      await jwtVerify(

        token,

        new TextEncoder().encode(
          process.env.JWT_SECRET
        )
      );

      return NextResponse.next();

    } catch (err) {

      // INVALID TOKEN

      return NextResponse.redirect(

        new URL(
          "/admin/login",
          req.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {

  matcher: ["/admin/:path*"],
};