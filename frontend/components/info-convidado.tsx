import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Hash, Mail, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dadosConvidado } from "@/actions/convidados";

type InfoUsuarioProps = {
    convidadoId: string
    className?: string
}

export async function InfoConvidado({ convidadoId, className }: InfoUsuarioProps) {
    const convidado = await dadosConvidado(convidadoId)
    console.log("Usuario: ", convidado)

    return (
        <div className={cn("flex items-center justify-center p-6", className)}>
            <Card className="w-full max-w-md">
                <CardHeader className="border-b pb-4">
                    <CardTitle>Informações do Usuário</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Nome: {convidado.nome}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Sobrenome: {convidado.sobrenome}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Cpf: {convidado.cpf}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Telefone: {convidado.telefone}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Email: {convidado.email}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Numero da Mesa: {convidado.numero_mesa}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Nome: {convidado.presenca ? "Presente" : "Não Presente"}</h1>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Link href="/admin/usuarios">
                        <Button variant="outline">Voltar</Button>
                    </Link>
                    <Button>Editar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}