import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { User } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/auth")) return NextResponse.next();
    
  const session = await auth.api.getSession({ 
    headers: req.headers 
  });

  if (!session) {
    
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const user = session.user as User;

 
  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    
    return NextResponse.redirect(new URL("/", req.url)); 
  }

  
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
  runtime: 'nodejs', 
};
