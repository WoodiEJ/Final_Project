import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'
import {fakerPT_BR} from '@faker-js/faker'
import {ulid} from 'ulid'
import { gerarCpf } from "../lib/gerarCpf";

async function main() {
    console.log("--- Seed Iniciando ---")
    await prisma.usuario.deleteMany()
    await prisma.convidados.deleteMany()

    const senhaCriptografado = await bcrypt.hash("123456", 10)

    console.log("Criado um admin com email de -admin@email.com-")
    await prisma.usuario.create({
        data: {
            id: ulid(),
            nome: "Usuario Admin",
            cpf: "123.456.789-12",
            email: "admin@email.com",
            senha: senhaCriptografado,
            role: "admin"
        }
    })

    console.log("Criado um recepcionista com email de -recepcionista@email.com-")
    await prisma.usuario.create({
        data: {
            id: ulid(),
            nome: "Usuario Recepcionista",
            cpf: "098.765.432-11",
            email: "recepcionista@email.com",
            senha: senhaCriptografado,
            role: "recepcionista"
        }
    })

    const convidadosAleatorios = Array.from({ length: 30 }, () => ({
        id: ulid(),
        nome: fakerPT_BR.person.firstName(),
        sobrenome: fakerPT_BR.person.lastName(),
        cpf: gerarCpf(),
        telefone: fakerPT_BR.phone.number(),
        email: fakerPT_BR.internet.email().toLowerCase(),
        numero_mesa: fakerPT_BR.number.int({ min: 1, max: 30 }),
        presenca: fakerPT_BR.datatype.boolean()
    }))

    console.log("--- 30 convidados foram registrados ---")
    await prisma.convidados.createMany({data: convidadosAleatorios})

    console.log("Seed finalizado! Todas as senhas são -123456-")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })