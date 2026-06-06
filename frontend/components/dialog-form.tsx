import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { atualiarUsuario } from "@/actions/usuario"
import { toast } from "sonner"

type FormData = {
    nome: string
    cpf: string
    email: string
    senha: string
    role: "admin" | "recepcionista"
}

export function DialogAtualizar({ id, dados }: { id: string, dados: FormData }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm<FormData>({ defaultValues: dados })
    async function onSubmit(formData: FormData) {
        const result = await atualiarUsuario(id, formData)
        if (result.sucess === false) {
            toast.error(result.mensagem)
            return
        }
        toast.success("Usuário atualizado.")
        router.refresh()
    }

    const role = [
        "Admin",
        "Recepcionista"
    ]

    return (
        <Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-blue-800">Editar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Preenche os campos</DialogTitle>
                        <DialogDescription>
                            Preenche os campos para poder concluir
                        </DialogDescription>
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
                            <Input  {...register("email")} />
                        </Field>
                        <Field>
                            <Label>Senha</Label>
                            <Input  {...register("senha")} />
                        </Field>
                        <Combobox items={role}>
                            <ComboboxInput placeholder="Selecione o role" {...register("role")} />
                            <ComboboxContent>
                                <ComboboxEmpty>Esse role não existe.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Atualizar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
