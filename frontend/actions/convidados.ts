'use server'

import { cookies } from "next/headers"
import z from "zod"

const schema = z.object({
    nome: z.string().min(3, "Nome inválido"),
    sobrenome: z.string().min(3, "Sobrenome inválido."),
    cpf: z.string().min(11, "Cpf Inválido").max(14, "CPF Inválido."),
    telefone: z.string().min(10, "Numero inválido.").max(14, "Numero inválido."),
    email: z.string().email("Email inválido."),
    numero_mesa: z.number().positive("Digite um numero válido.")
})

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

export async function checkInConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const result = await fetch(`http://localhost:3001/convidados/${id}/checkin`, {
        method: "PUT",
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

export async function atualizarConvidado(
    id: string,
    formData: {
        nome: string,
        sobrenome: string,
        cpf: string,
        telefone: string,
        email: string,
        numero_mesa: number,
        presenca: boolean
    }
) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const role = cookieStore.get("role")?.value

    if (role !== "admin") {
        return { success: false, mensagem: "Acesso negado" }
    }

    const res = await fetch(`http://localhost:3001/convidados/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })

    const data = await res.json()
    if (!res.ok) {
        return { success: false, mensagem: data.mensagem }
    }
    return data.mensagem
}

export async function registrarConvidado(
    formData: {
        nome: string,
        sobrenome: string,
        cpf: string,
        telefone: string,
        email: string,
        numero_mesa: number,
    }) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const result = schema.safeParse(formData)

    if (!result.success) {
        return { success: false, mensagem: result.error.message }
    }

    const res = await fetch("http://localhost:3001/convidados/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(result.data)
    })

    const data = await res.json()
    if (!res.ok) {
        return { success: false, mensagem: data.mensagem }
    }
    return data.mensagem
}

export async function deletarConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const result = await fetch(`http://localhost:3001/convidados/${id}`, {
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

export async function dadosConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const result = await fetch(`http://localhost:3001/convidados/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.convidado
}