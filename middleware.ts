import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


import { auth } from "./lib/auth"; 
import { User } from "./lib/auth";


import { createI18nMiddleware } from 'next-international/middleware';


const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr' 
});



export async function middleware(request: NextRequest) {
    
    
    const response = I18nMiddleware(request);

    
    const url = response.headers.get('x-middleware-rewrite') || request.nextUrl.pathname;
    
   
    const pathnameWithoutLocale = url.replace(/^\/(en|fr)/, ''); 

    if (pathnameWithoutLocale.startsWith("/auth")) {
        return response; 
    }


    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        
        const localePrefix = request.nextUrl.pathname.startsWith('/fr') ? '/fr' : request.nextUrl.pathname.startsWith('/en') ? '/en' : '/fr'; // Fallback à 'fr'
        return NextResponse.redirect(new URL(`${localePrefix}/auth/signin`, request.url));
    }


    const user = session.user as User;

    
    if (
        pathnameWithoutLocale.startsWith("/dashboard/blog/write") ||
        pathnameWithoutLocale.startsWith("/dashboard/blog/edit")
    ) {
        return response; 
    }

   
    if (pathnameWithoutLocale.startsWith("/admin") && user.role !== "ADMIN") {
        
        return NextResponse.redirect(new URL("/", request.url));
    }


    return response; 
}



export const config = {
   
    matcher: ['/((?!api|_next|static|.*\\..*|favicon.ico|robots.txt).*)'],
    runtime: 'nodejs',
};