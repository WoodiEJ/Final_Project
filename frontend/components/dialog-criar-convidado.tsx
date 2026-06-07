"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { criarUsuario, usuarioLogado } from "@/actions/usuario"
import { toast } from "sonner"
import { registrarConvidado } from "@/actions/convidados"

type FormData = {
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
}

export function RegistrarConvidado() {
    const router = useRouter()
    const { register, handleSubmit } = useForm<FormData>()
    async function onSubmit(dados: FormData) {
        const result = await registrarConvidado(dados)
        const usuario = await usuarioLogado()
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        if (usuario.role !== "admin") {
            return { success: false, mensagem: "Acesso negado. Apenas administradores." }
        }
        toast.success("Convidado registrado com sucesso.")
        router.refresh()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Registrar Novo Convidado</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
                    <DialogHeader className="pb-2">
                        <DialogTitle>Preenche os campos</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>Nome</Label>
                            <Input {...register("nome")} />
                        </Field>
                        <Field>
                            <Label>Sobrenome</Label>
                            <Input {...register("sobrenome")} />
                        </Field>
                        <Field>
                            <Label>CPF</Label>
                            <Input {...register("cpf")} />
                        </Field>
                        <Field>
                            <Label>Telefone</Label>
                            <Input {...register("telefone")} />
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input {...register("email")} />
                        </Field>
                        <Field>
                            <Label>Numero Mesa</Label>
                            <Input {...register("numero_mesa", { valueAsNumber: true })} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-2 gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Registrar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
