import { listarConvidados } from "@/actions/convidados"
import { listarUsuarios, usuarioLogado } from "@/actions/usuario"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function SectionCards() {
  const usuarioLogin = await usuarioLogado()
  const convidados = await listarConvidados()
  const qtdConvidados = convidados.length
  const convidadosPresentes = convidados.filter((c: { presenca: boolean }) => c.presenca === true).length
  const convidadosNaoPresentes = convidados.filter((c: { presenca: boolean }) => c.presenca === false).length
  const convidadosTotal = convidadosNaoPresentes + convidadosPresentes

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
            {convidadosTotal}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {convidadosPresentes} Presentes
          </div>
          <div className="text-muted-foreground">
            {convidadosNaoPresentes} Não Presentes
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
