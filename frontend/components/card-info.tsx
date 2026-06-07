import { dadosUsuario } from "@/actions/usuario";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Hash, Mail, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type InfoUsuarioProps = {
    usuarioId: string
    className?: string
}

export async function InfoUsuario({ usuarioId, className }: InfoUsuarioProps) {
    const usuario = await dadosUsuario(usuarioId)
    console.log("Usuario: ", usuario)

    return (
        <div className={cn("flex items-center justify-center p-6", className)}>
            <Card className="w-full max-w-md">
                <CardHeader className="border-b pb-4">
                    <CardTitle>Informações do Usuário</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Nome: {usuario.nome}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Cpf: {usuario.cpf}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">

                        <h1>Email: {usuario.email}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Role: {usuario.role}</h1>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Link href="/admin/usuarios">
                        <Button variant="outline">Voltar</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}