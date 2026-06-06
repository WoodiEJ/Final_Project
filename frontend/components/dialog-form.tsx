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
        if (result.success === false) {
            toast.error(JSON.parse(result.mensagem)[0].message)
            return
        }
        toast.success("Usuário atualizado.")
        router.refresh()
    }

    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-blue-800">Editar</Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
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
                            <Input  {...register("email")} />
                        </Field>
                        <Field>
                            <Label>Senha</Label>
                            <Input  {...register("senha")} />
                        </Field>
                        <Field>
                            <Label>Role</Label>
                            <Input  {...register("role")} />
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
