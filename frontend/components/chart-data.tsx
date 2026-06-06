// components/chart-pie-donut-text.tsx
import { listarConvidados } from "@/actions/convidados"
import { ChartPieDonutTextClient } from "./chart-pie"

export async function ChartPieDonutText() {
    const convidados = await listarConvidados()

    const presentes = convidados.filter((c: { presenca: boolean }) => c.presenca === true).length
    const ausentes = convidados.length - presentes

    const chartData = [
        { status: "presentes", quantidade: presentes, fill: "var(--color-presentes)" },
        { status: "ausentes", quantidade: ausentes, fill: "var(--color-ausentes)" },
    ]

    return <ChartPieDonutTextClient chartData={chartData} total={convidados.length} />
}