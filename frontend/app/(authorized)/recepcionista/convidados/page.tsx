import { listarConvidados } from "@/actions/convidados";
import { usuarioLogado } from "@/actions/usuario";
import { columnsConvidado } from "@/components/columsConvidados";
import { DataTable } from "@/components/data-table";
import { RegistrarConvidado } from "@/components/dialog-criar-convidado";

export default async function ConvidadosRecepcionista() {
    const convidados = await listarConvidados()
    const usuario = await usuarioLogado()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Usuários</h1>
                <RegistrarConvidado />
            </div>
            <DataTable columns={columnsConvidado} data={convidados} />
        </div>
    )
}