export interface Convidados {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
    presenca: Boolean
}

export interface Usuario {
    id: string
    nome: string
    cpf: string
    email: string
    senha: string
    role: "admin" | "recepcionista"
}

export interface JwtPayload {
    id: number
    role: "admin" | "recepcionista"
}