'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Login } from "@/actions/login"
import { toast } from "sonner"

const schema = z.object({
  email: z.string().email("Email inválidos."),
  senha: z.string().min(6, "A senha deve conter pelo menos 6 caracteres.")
})

type FormData = z.infer<typeof schema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  const onSubmit = async (data: FormData) => {
    const result = await Login(data.email, data.senha)

    if (result.success) {
      if (result.role === "admin") {
        toast.success("Login efetuado com sucesso.", {
          description: "Vamos te direcionar ao sistema."
        })
        router.push("/admin/dashboard")
      } else {
        toast.success("Login efetuado com sucesso.", {
          description: "Vamos te direcionar ao sistema."
        })
        router.push("/recepcionista/dashboard")
      }
    } else {
      toast.warning(`${result.mensagem}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Logue na sua conta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Coloque seu email e senha
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="exemplo@email.com" {...register("email")} required />
          <p>{errors.email?.message}</p>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password" type="password" {...register("senha")} placeholder="******" required />
          <p>{errors.senha?.message}</p>
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
