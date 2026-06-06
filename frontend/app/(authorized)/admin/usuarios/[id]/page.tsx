"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


export default function VerUsuario() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Informações sobre o usuário</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Email</Label>
                    </div>
                </div>
            </CardContent>
        </Card>    
    )
}