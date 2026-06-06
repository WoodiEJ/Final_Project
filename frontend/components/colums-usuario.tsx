"use client"

import { dadosUsuario, deletarUsuario } from "@/actions/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { DialogAtualizar } from "./dialog-form"
import { LuEye, LuTrash, Trash } from "react-icons/lu"
import Link from "next/link"
import { GiEyestalk } from "react-icons/gi"
import { IconName } from "react-icons/lu";


type Usuarios = {
    id: string
    nome: string
    cpf: string
    email: string
    senha: string
    role: "recepcionista" | "admin"
}

export function AcoesUsuario({ id }: { id: string }) {
    const router = useRouter()

    async function deletar() {
        const result = await deletarUsuario(id)
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        toast.success("Usuario deletado.")
        router.refresh()
    }

    async function verUsuario(usuario: []) {
        const result = await dadosUsuario(id)
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        router.push(`/admin/usuarios/${id}`)
        const data = await result.json()
        usuario = data.usuario
    } 

    return (
        <div className="flex gap-2">
            <Button size="sm" variant="outline"> 
                <LuEye />
            </Button>
            <Button variant="destructive" size="sm" onClick={deletar}>
                <LuTrash/>
                Deletar
            </Button>
        </div>
    )
}

export const columnsUsuario: ColumnDef<Usuarios>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "cpf",
        header: "CPF",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <AcoesUsuario id={row.original.id} />
                    <DialogAtualizar
                        id={row.original.id}
                        dados={{
                            nome: row.original.nome,
                            cpf: row.original.cpf,
                            email: row.original.email,
                            senha: "",
                            role: row.original.role
                        }}
                    />
                </div>
            )
        }
    }
]