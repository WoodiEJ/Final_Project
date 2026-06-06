import { Request, Response } from "express";
import z from 'zod'
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = z.object({
    email: z.string(),
    senha: z.string().min(6)
})

export async function login(req: Request, res: Response) {
    try {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos."
            })
        }
    
        const {email, senha} = result.data
        const usuarioExiste = await prisma.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!usuarioExiste) {
            return res.status(404).json({
                success: false,
                mensagem: "Credenciais inválidos."
            })
        }

        const senhaCerta = await bcrypt.compare(senha, usuarioExiste.senha)

        if (!senhaCerta) {
            return res.status(404).json({
                success: false,
                mensagem: "Credenciais inválidos."
            })
        }

        const token = jwt.sign(
            {id: usuarioExiste.id, role: usuarioExiste.role },
            process.env.JWT_SECRET!,
            {expiresIn: '3h'}
        )

        return res.status(200).json({
            success: true,
            mensagem: "Logado com sucesso.",
            token,
            role: usuarioExiste.role,
            id: usuarioExiste.id
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}