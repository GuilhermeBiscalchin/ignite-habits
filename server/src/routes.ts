import dayjs from 'dayjs'
// importar as Rotas, e o app usar uma função que é recomendação do Fantify
import { FastifyInstance } from "fastify";

//importando o zod para validação.
import { z } from "zod";

import { prisma } from "./lib/prisma";

// Métodos HTTP: GET, POST, PUT, PATH,DELETE
//necessita ser uma função assincróna.
export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    //trabalhar com datas.
    const today = dayjs().startOf('day').toDate()

    //criando com o prisma o habito.
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
        date: z.coerce.date()
    })

    const {date} = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')
   

    const possibleHabits = await prisma.habit.findMany({
        where:{
            created_at:{
                lte:date,
            },
            weekDays:{
                some: {
                    week_day: weekDay
                }
            }
        }
    })

    const day = await prisma.day.findUnique({
        where:{
            date: parsedDate.toDate(),
        },
        include:{
            dayHabits:true,
        }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
        return dayHabit.habit_id
    })

    return {
        possibleHabits,
        completedHabits,
    }
  })
}

//Rota de quando completar o habito.

 //informações a receber.
    //Todos os habitos possiveis
    // habitos que ja foram completados.s