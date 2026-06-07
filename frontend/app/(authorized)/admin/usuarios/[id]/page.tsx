import { InfoUsuario } from "@/components/card-info";

export default async function VerUsuario({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <InfoUsuario usuarioId={id} />
    )
}