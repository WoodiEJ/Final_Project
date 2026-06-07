import { InfoConvidado } from "@/components/info-convidado"

export default async function ConvidadoDetalhe({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <InfoConvidado convidadoId={id} />
    )
}