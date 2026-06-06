import { listarConvidados } from "@/actions/convidados"
import { listarUsuarios } from "@/actions/usuario"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export async function SectionCards() {
  const convidados = await listarConvidados()
  const qtdConvidados = convidados.length
  const convidadosPresentes = convidados.filter((c: { presenca: boolean }) => c.presenca === true).length
  const usuarios = await listarUsuarios()
  const qtdUsuarios = usuarios.length
  const qtdAdmin = usuarios.filter((u: { role: string }) => u.role === "admin").length
  const qtdRecep = usuarios.filter((u: { role: string }) => u.role === "recepcionista").length
  const convidadosNaoPresentes = convidados.filter((c: { presenca: boolean }) => c.presenca === false).length

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Convidados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {qtdConvidados}
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {convidadosPresentes} presentes
          </div>
          <div className="text-muted-foreground">
            Total de convidados que marcaram presença
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Usuários</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {qtdUsuarios}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {qtdAdmin} Admins
          </div>
          <div className="text-muted-foreground">
            {qtdRecep} Recepcionistas
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Convidados Não Presentes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {convidadosNaoPresentes}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Convidados Não Presentes
          </div>
          <div className="text-muted-foreground">Esses convidados ainda não marcaram presença</div>
        </CardFooter>
      </Card>
    </div>
  )
}
