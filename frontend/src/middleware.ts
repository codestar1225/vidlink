import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value?.trim() || "";

  if (!token || typeof token !== "string") {
    const res = NextResponse.redirect(new URL("/signin", req.url));
    res.cookies.set("reqUrl", req.url, { maxAge: 60 * 60 });
    return res;
  }

  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!jwtSecret || typeof jwtSecret !== "string") {
    throw new Error("JWT_SECRET is not defined or is not a string");
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    const res = NextResponse.redirect(
      new URL("/signin?error=invalid_token", req.url)
    );
    res.cookies.set("reqUrl", req.url, { maxAge: 60 * 60 });
    res.cookies.delete("user");
    res.cookies.delete("token");
    alert("aaaaaaa");
    return res;
  }
}

export const config = {
  matcher: ["/profile", "/settings", "/upload/:path*", "/dashboard"],
};
