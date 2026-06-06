'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function Login(email: string, senha: string) {
    const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, senha})
    })

    const data = await res.json()

    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }

    const token = data.token
    const cookieStore = await cookies()

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: '/'
    })
    cookieStore.set("id", data.id, {
        httpOnly: true,
        maxAge: 60 * 60 * 24
    })
    cookieStore.set("role", data.role, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/'
    })

    return {success: true, role: data.role, id: data.id }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("token")
    cookieStore.delete("id")
    cookieStore.delete("role")
    redirect('/')
}