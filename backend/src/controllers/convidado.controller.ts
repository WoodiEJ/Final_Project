import {Request, Response} from 'express'
import { prisma } from '../../lib/prisma'
import z from 'zod'

const schema = z.object({
    nome: z.string().min(3),
    sobrenome: z.string().min(3),
    cpf: z.string().max(14),
    telefone: z.string().min(10),
    email: z.string().email(),
    numero_mesa: z.number().int().positive()
}).required()

const schemaOptional = schema.partial()

export async function listarConvidados(req: Request, res: Response) {
    try {
        const convidados = await prisma.convidados.findMany()

        if (convidados.length === 0) {
            return res.status(404).json({
                success: false,
                mensagem: "Nenhum convidado encontrado."
            })
        }

        return res.status(200).json({
            success: true,
            convidados
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function procurarConvidado(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const convidado = await prisma.convidados.findUnique({where: {id}})

        if (!convidado) {
            return res.status(404).json({
                success: false,
                mensagem: "Convidado não encontrado."
            })
        }

        return res.status(200).json({
            success: true,
            convidado
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function registrarConvidado(req: Request, res: Response) {
    try {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos para poder registrar o convidado."
            })
        }

        const {nome, sobrenome, cpf, telefone, email, numero_mesa} = result.data
        const convidadoExiste = await prisma.convidados.findFirst({
            where: {cpf: cpf}
        })

        if (convidadoExiste) {
            return res.status(400).json({
                success: false,
                mensagem: "Convidado já registrado."
            })
        }

        await prisma.convidados.create({
            data: {
                nome: nome, 
                sobrenome: sobrenome,
                cpf: cpf,
                telefone: telefone,
                email: email,
                numero_mesa: numero_mesa
            }
        })

        return res.status(201).json({
            success: true,
            mensagem: "Convidado registrado com sucesso."
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function atualizarConvidado(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const convidado = await prisma.convidados.findUnique({where: {id}})

        if (!convidado) {
            return res.status(404).json({
                success: false,
                mensagem: "Convidado não encontrado."
            })
        }

        const result = schemaOptional.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos por favor."
            })
        }

        const {nome, sobrenome, cpf, telefone, email, numero_mesa} = result.data
        await prisma.convidados.update({
            where: {id},
            data: result.data
        })

        return res.status(200).json({
            success: true,
            mensagem: "Convidado atualizado com sucesso."
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function deletarConvidado(req: Request,  res: Response) {
    try {
        const id = req.params.id as string
        const convidado = await prisma.convidados.findUnique({where: {id}})

        if (!convidado) {
            return res.status(404).json({
                success: false,
                mensagem: "Convidado não encontrado."
            })
        }

        await prisma.convidados.delete({where: {id}})
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}

export async function checkIN(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const convidado = await prisma.convidados.findUnique({where: {id}})

        if (!convidado) {
            return res.status(404).json({
                success: false,
                mensagem: "Convidado não encontrado."
            })
        }

        if (convidado.presenca === true) {
            return res.status(400).json({
                success: false,
                mensagem: "Convidado já está com presença marcada."
            })
        }

        await prisma.convidados.update({
            where: {id},
            data: {
                presenca: true
            }
        })

        return res.status(200).json({
            success: true,
            mensagem: `Convidado ${convidado.nome} marcado como presente.`
        })
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}