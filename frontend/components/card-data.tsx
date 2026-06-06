import { dadosUsuario } from "@/actions/usuario"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export async function CardSmall(id: string) {
    const usuario = dadosUsuario(id)

    return (
        <Card size="sm" className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>Informações do usuário.</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                    Voltar
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                    Editar
                </Button>
            </CardFooter>
        </Card>
    )
}
