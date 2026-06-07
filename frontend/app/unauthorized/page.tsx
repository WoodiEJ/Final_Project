import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
                <ShieldX className="size-16 text-destructive" />
                <h1 className="text-3xl font-bold">Acesso negado</h1>
                <p className="text-muted-foreground max-w-sm">
                    Você não tem permissão para acessar essa página.
                </p>
            </div>
            <Link href={"/"}>
                <Button>Voltar ao inicio</Button>
            </Link>
        </div>
    )
}