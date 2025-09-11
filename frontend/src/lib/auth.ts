import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserFromCookie(token: string | undefined) {
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const user = await getUserFromCookie(token);
    if (!user) return null;

    return { user, token };
}

export async function requireAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const user = await getUserFromCookie(token);

    if (!user) {
        redirect("/login");
    }

    return { user, token };
}
