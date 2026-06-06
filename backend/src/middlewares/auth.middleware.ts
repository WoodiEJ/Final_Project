import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({
            success: false,
            mensagem: "Token não encontrado ou inválido."
        })
    }

    const token = header.slice(7)

    if (!token) {
        return res.status(401).json({
            success: false,
            mensagem: "Token não encontrado ou inválido."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string, role: string}
        req.usuario = {id: decoded.id, role: decoded.role}
        next()
    } catch (erro) {
        console.error("Erro interno: ", erro)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}