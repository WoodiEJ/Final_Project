import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import z from "zod";
import bcrypt from 'bcrypt'
import { Role } from "../../generated/prisma/enums";

const schema = z.object({
    nome: z.string().min(6),
    cpf: z.string().max(14),
    email: z.string().email(),
    senha: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
    role: z.nativeEnum(Role)
}).required()

const schemaOptional = schema.partial()

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await prisma.usuario.findMany()

        if (usuarios.length === 0) {
            return res.status(404).json({
                success: false,
                mensagem: "Nenhum usuário encontrado."
            })
        }

        return res.status(200).json({
            success: true,
            usuarios
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function pesquisarUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const usuario = await prisma.usuario.findUnique({where: {id}})

        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuário não encontrado."
            })
        }

        return res.status(200).json({
            success: true,
            usuario
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function criarUsuario(req: Request, res: Response) {
    try {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos para poder criar o usuário."
            })        
        }

        const {nome, cpf, email, senha, role} = result.data
        const usarioExiste = await prisma.usuario.findFirst({
            where: {
                cpf: cpf
            }
        })

        if (usarioExiste) {
            return res.status(404).json({
                success: false,
                menagem: "Usuário já cadastrado."
            })
        }

        const senhaCriptografado = await bcrypt.hash(senha, 10)

        await prisma.usuario.create({
            data: {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senhaCriptografado, 
                role: role
            }
        })

        return res.status(201).json({
            success: false,
            mensagem: "Usuário criado com sucesso."
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function atualizarUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const usuario = await prisma.usuario.findUnique({where: {id}})
        const result = schemaOptional.safeParse(req.body)

        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuário não encontrado."
            })
        }

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos por favor."
            })
        }

        const { nome, cpf, email, senha, role} = result.data
        const senhaCriptografado = senha ? await bcrypt.hash(senha, 10) : undefined

        await prisma.usuario.update({
            where: {id},
            data: {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senhaCriptografado,
                role: role
            }
        })

        return res.status(200).json({
            success: true,
            mensagem: "Usuário atualizado."
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function deletarUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const convidado = await prisma.usuario.findUnique({where: {id}})

        if (!convidado) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuário não encontrado."
            })
        }

        await prisma.usuario.delete({where: {id}})
        return res.status(200).json({
            success: true,
            mensagem: "Usuário deletado com sucesso."
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}