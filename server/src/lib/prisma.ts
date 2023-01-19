//Importando o banco de dados separado.

//acessar o banco de dados, para visualizar pelas rotas as informações criadas.
import {PrismaClient} from '@prisma/client'
// Inicializando a constante.
export const prisma = new PrismaClient({
    log: ['query']
})