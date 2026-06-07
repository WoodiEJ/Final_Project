"use client"

import { deletarUsuario, usuarioLogado } from "@/actions/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { DialogAtualizar } from "./dialog-form"
import { LuEye, LuTrash } from "react-icons/lu"
import { Check, Eye } from "lucide-react"
import { checkInConvidado, deletarConvidado } from "@/actions/convidados"
import { DialogAtualizarConvidado } from "./dialog-put-convit"


type Convidados = {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
    presenca: boolean
}

export function AcoesConvidado({ id }: { id: string }) {
    const router = useRouter()

    async function deletar() {
        const result = await deletarConvidado(id)
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        const data = await result.json()
        toast.success(data.mensagem)
        router.refresh()
    }

    async function checkIn() {
        const result = await checkInConvidado(id)
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        toast.success("Check-in realizado.")
        router.refresh()
    }

    async function verConvidado() {
        const usuario = await usuarioLogado()
        if (usuario.role === "admin") {
            router.push(`/admin/convidados/${id}`)
        } else {
            router.push(`/recepcionista/convidados/${id}`)
        }
    }

    return (
        <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={checkIn}>
                <Check />
            </Button>
            <Button size="sm" variant="outline" onClick={verConvidado}>
                <Eye />
            </Button>
            <Button variant="destructive" size="sm" onClick={deletar}>
                <LuTrash />
            </Button>
        </div>
    )
}

export const columnsConvidado: ColumnDef<Convidados>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "sobrenome",
        header: "Sobrenome",
    },
    {
        accessorKey: "cpf",
        header: "Cpf",
    },
    {
        accessorKey: "telefone",
        header: "Telefone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "numero_mesa",
        header: "Numero Da Mesa",
    },
    {
        accessorKey: "presenca",
        header: "Presença",
        cell: ({ row }) => (
            <span>{row.original.presenca ? "Presente" : "Não Presente"}</span>
        )
    },
    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <AcoesConvidado id={row.original.id} />
                    <DialogAtualizarConvidado
                        id={row.original.id}
                        dados={row.original}
                    />
                </div>
            )
        }
    }
]