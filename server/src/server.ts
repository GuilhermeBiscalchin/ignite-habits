import Fantify from 'fastify'

//Importando o CORS, do fantify,depois de instalado.
import cors from '@fastify/cors'

//acessar o banco de dados, para visualizar pelas rotas as informações criadas.
import {PrismaClient} from '@prisma/client'


const app = Fantify()
// Inicializando a constante.
const prisma = new PrismaClient()

//para habilitar o cors, dessa forma qualquer pode acessar a api, com o 'origin', posso definir quais os locais que pode acessar.
app.register(cors)

// Métodos HTTP: GET, POST, PUT, PATH,DELETE

app.get('/',async  () => {
    const habits = await prisma.habit.findMany()
           
    return habits
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server running!")
})