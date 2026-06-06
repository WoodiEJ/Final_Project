'use server'

import { cookies } from "next/headers"

export async function listarConvidados() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const result = await fetch("http://localhost:3001/convidados", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.convidados
}