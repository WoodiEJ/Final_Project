"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { atualizarConvidado } from "@/actions/convidados"

type FormData = {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
    presenca: boolean
}

export function DialogAtualizarConvidado({ id, dados }: { id: string, dados: FormData }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm<FormData>({ defaultValues: dados })

    async function onSubmit(formData: FormData) {
        const result = await atualizarConvidado(id, formData)
        if (result.success === false) {
            toast.error(result.mensagem)
            return
        }
        toast.success("Convidado atualizado.")
        router.refresh()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Editar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Atualizar Convidado</DialogTitle>
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
                            <Label>Número da Mesa</Label>
                            <Input type="number" {...register("numero_mesa", { valueAsNumber: true })} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Atualizar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}