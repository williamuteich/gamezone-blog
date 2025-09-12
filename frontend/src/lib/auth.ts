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

export async function logoutUser() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            // Redirecionar para login após logout bem-sucedido
            redirect("/login");
        } else {
            throw new Error('Erro ao fazer logout');
        }
    } catch (error) {
        console.error('Erro no logout:', error);
        // Mesmo com erro, redirecionar para login (cookie será limpo)
        redirect("/login");
    }
}

export async function logoutTeam() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            // Redirecionar para login da equipe após logout bem-sucedido
            redirect("/login/team");
        } else {
            throw new Error('Erro ao fazer logout da equipe');
        }
    } catch (error) {
        console.error('Erro no logout da equipe:', error);
        // Mesmo com erro, redirecionar para login da equipe
        redirect("/login/team");
    }
}
