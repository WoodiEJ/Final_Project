import { NextFunction, Request, Response } from "express";

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.usuario.role !== "admin") {
        return res.status(401).json({
            success: false,
            mensagem: "Acesso negado."
        })
    }
    next()
}