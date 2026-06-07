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
import { criarUsuario } from "@/actions/usuario"
import { toast } from "sonner"

type FormData = {
    nome: string
    cpf: string
    email: string
    senha: string
    role: "admin" | "recepcionista"
}

export function CriarUsuario() {
    const router = useRouter()
    const { register, handleSubmit } = useForm<FormData>()
    async function onSubmit(dados: FormData) {
        const result = await criarUsuario(dados)
        if (result.success === false) {
            toast.error(JSON.parse(result.mensagem)[0].message)
            return
        }
        toast.success("Usuário criado com sucesso.")
        router.refresh()
        router.push("/admin/usuarios")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Criar Novo Usuário</Button>
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
                            <Label>Cpf</Label>
                            <Input {...register("cpf")} />
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input type="email"  {...register("email")} />
                        </Field>
                        <Field>
                            <Label>Senha</Label>
                            <Input type="password"  {...register("senha")} />
                        </Field>
                        <Field>
                            <Label>Role</Label>
                            <select {...register("role")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="admin">Admin</option>
                                <option value="recepcionista">Recepcionista</option>
                            </select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-2 gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Criar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
