import { NextRequest, NextResponse } from "next/server";
import { parseJwtPayload } from "./lib/jwt";

const ADMIN_PATH = ["/admin"]
const RECEP_PATH = ["/recepcionista"]

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    console.log("MIDDLEWARE:", req.nextUrl.pathname) // ← primeira linha
    const isAdminPath = ADMIN_PATH.some((p) => pathname.startsWith(p))
    const isRecepPath = RECEP_PATH.some((p) => pathname.startsWith(p))

    const token = req.cookies.get("token")?.value

    if (pathname === "/") {
        if (!token) return NextResponse.next()
        const payload = parseJwtPayload(token)
        if (!payload) return NextResponse.next()
        if (payload.role === "recepcionista") {
            return NextResponse.redirect(new URL("/recepcionista/dashboard", req.url))
        }
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    const payload = parseJwtPayload(token)

    if (!payload) {
        const response = NextResponse.redirect(new URL("/", req.url))
        response.cookies.delete("token")
        response.cookies.delete("id")
        response.cookies.delete("role")
        return response
    }

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    if (pathname.startsWith("/recepcionista") && payload.role !== "recepcionista" && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    console.log("token:", token)
    console.log("payload:", parseJwtPayload(token))

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/admin/:path*", "/recepcionista/:path*"]
}