"use client"

import { deletarUsuario } from "@/actions/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { DialogAtualizar } from "./dialog-form"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

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

    return (
        <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={deletar}>
                <Trash />
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
                    <Link href={""}>
                        <Pencil />
                    </Link>
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