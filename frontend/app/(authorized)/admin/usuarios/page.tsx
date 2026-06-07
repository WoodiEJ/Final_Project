import { columnsUsuario } from "@/components/colums-usuario"
import { DataTable } from "@/components/data-table"
import { listarUsuarios } from "@/actions/usuario"
import { Button } from "@/components/ui/button"
import { CriarUsuario } from "@/components/dialog-create-user"

export default async function Usuarios() {
    const usuarios = await listarUsuarios()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Usuários</h1>
                <CriarUsuario />
            </div>
            <DataTable columns={columnsUsuario} data={usuarios ?? []} />
        </div>
    )
}