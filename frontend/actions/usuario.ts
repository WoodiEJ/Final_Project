'use server'

import { cookies } from "next/headers";
import z from "zod";

const schema = z.object({
    nome: z.string().min(6, "Nome inválido."),
    cpf: z.string().max(14, "Cpf inválido."),
    email: z.string().email("Email inválido."),
    senha: z.string().min(6, "A senha deve conter pelo menos 6 caracteres."),
    role: z.enum(["admin", "recepcionista"])
})

export async function dadosUsuario(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!id) return null

    const result = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`    
        }
    })

    const data = await result.json()
    return data.usuario
}

export async function listarUsuarios() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const result = await fetch("http://localhost:3001/usuarios", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.usuarios
}

export async function deletarUsuario(id: string) {
    const cookieStore = await cookies()
    const role = cookieStore.get("role")?.value
    const token = cookieStore.get("token")?.value

    if (role !== "admin") {
        return {success: false, mensagem: "Acesso negado."}
    }

    const result = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await result.json()
    if (!result.ok) {
        return { success: false, mensagem: data.mensagem }
    }
    return data.mensagem
}

export async function atualiarUsuario(id: string, formData: {
    nome: string
    cpf: string
    email: string
    senha: string
    role: "admin" | "recepcionista"
}) {
    const result = schema.safeParse(formData)
    const cookieStore = await cookies()
    const role = cookieStore.get("role")?.value
    const token = cookieStore.get("token")?.value

    if (!result.success) {
        return { success: false, mensagem: result.error.message }
    }

    if (role !== "admin") {
        return {success: false, mensagem: "Acesso negado."}
    }

    const res = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })

    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }
    return data.mensagem
}

export async function criarUsuario(formData: {
    nome: string
    cpf: string
    email: string
    senha: string
    role: "admin" | "recepcionista"
}) {
    const result = schema.safeParse(formData)
    const cookieStore = await cookies()
    const role = cookieStore.get("role")?.value
    const token = cookieStore.get("token")?.value

    if (!result.success) {
        return { success: false, mensagem: result.error.message }
    }

    if (role !== "admin") {
        return { success: false, mensagem: "Acesso negado."}
    }

    const res = await fetch("http://localhost:3001/usuarios/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(result.data)
    })

    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem}
    }
    return data.mensagem
}

export async function usuarioLogado() {
    const cookieStore = await cookies()
    const id = cookieStore.get("id")?.value
    const role = cookieStore.get("role")?.value

    const usuario = { id, role }
    return usuario
}