import { fakerPT_BR } from "@faker-js/faker";

export function gerarCpf() {
    const n = Array.from({length: 9}, () => fakerPT_BR.number.int({min: 0, max: 9}))

    let part1 = n.reduce((acc, val, i) => acc + val * (10 - i), 0)
    part1 = 11 - (part1 % 11)
    if (part1 >= 10) part1 = 0

    let part2 = n.reduce((acc, val, i) => acc + val * (11 - i), 0) + part1 * 2
    part2 = 11 - (part2 % 11)
    if (part2 >= 10) part2 = 0

    const cpf = [...n, part1, part2]
    return `${cpf.slice(0,3).join('')}.${cpf.slice(3,6).join('')}.${cpf.slice(6,9).join('')}-${cpf.slice(9).join('')}`
}