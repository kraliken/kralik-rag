import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard"];
const publicRoutesRedirectIfAuthed = ["/"]; // ha akarod később használni

export async function proxy(request) {
    const url = request.nextUrl;
    const originalPathname = url.pathname;

    // Trailing slash normalizálása
    const pathname =
        originalPathname !== "/" && originalPathname.endsWith("/")
            ? originalPathname.slice(0, -1)
            : originalPathname;

    // 0) STATIKUS / BELSŐ ÚTVONALAK KIHAGYÁSA
    const isNextInternal = pathname.startsWith("/_next");
    const isApi = pathname.startsWith("/api");
    const isPublicFile = pathname.match(/\.[^/]+$/); // pl. .png, .ico, .js, .css

    if (isNextInternal || isApi || isPublicFile) {
        return NextResponse.next();
    }

    // ✅ EDGE-SAFE session helyett JWT token olvasás
    // Fontos: legyen beállítva az AUTH_SECRET Azure env-ben is!
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    const isHome = pathname === "/";
    const isLogin = pathname === "/login";
    const isChangePassword = pathname === "/change-password";

    // =================
    // 1) NINCS TOKEN
    // =================
    if (!token) {
        // Védett route → vissza főoldalra
        if (isProtected) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // /change-password ne legyen elérhető login nélkül
        if (isChangePassword) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // Minden más publikus
        return NextResponse.next();
    }

    // ==========================
    // 2) VAN TOKEN - extra infók
    // ==========================
    const status = token?.status;

    // INACTIVE BLOKKOLÁS
    if (status === "inactive") {
        return NextResponse.redirect(new URL("/?reason=inactive", request.url));
    }

    const mustChangePassword = token?.mustChangePassword ?? false;

    // ==========================
    // 3) KÖTELEZŐ JELSZÓCSERE
    // ==========================
    if (mustChangePassword) {
        if (!isChangePassword) {
            return NextResponse.redirect(new URL("/change-password", request.url));
        }

        // Ha már /change-password-on vagyunk → mehet tovább
        return NextResponse.next();
    }

    // ==========================
    // 4) NEM KELL MÁR JELSZÓCSERE
    // ==========================
    // Ha már nem kell jelszót cserélni, ne lehessen visszamenni
    if (isChangePassword) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Bejelentkezve, és / vagy /login → dashboard
    if (isHome || isLogin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Védett route + van token → oké
    return NextResponse.next();
}
