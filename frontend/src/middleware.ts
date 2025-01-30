import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value?.trim();

  if (!token || typeof token !== "string") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || typeof jwtSecret !== "string") {
    throw new Error("JWT_SECRET is not defined or is not a string");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret)
    );
    console.log("Decoded JWT Payload:", payload);

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/upload/:path*"],
};
