import { FormEvent, useState } from 'react'
import { app } from '../lib/axios'
import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox'

const availableWekkDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado"
]


export function NewHabitForm() {
    //começa com uma String Vazia, que Usuário vai trocar.
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createWeekHabit(event: FormEvent) {
        event.preventDefault()
        console.log(title, weekDays)

        if (!title || weekDays.length === 0) {
            return alert("Digite Algo")
        }

        await app.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])
        alert('Habito Criado com Sucesso!')
    }




    // function handleTitleHabit(event: ChangeEvent){
    //     setTitle(event.target.value)
    // }

    function handleToggleWeekDay(weekDay: number) {
        //percorrer a lista e ver se o dia da semana está presente.

        if (weekDays.includes(weekDay)) {
            const weekDayRIRemoveDone = weekDays.filter(day => day === weekDay)

            setWeekDays(weekDayRIRemoveDone)
        } else {
            const weekDayAddDone = [...weekDays, weekDay]

            setWeekDays(weekDayAddDone)
        }
    }

    return (
        <form
            onSubmit={createWeekHabit}
            className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input
                type={"text"}
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                value={title}
                autoFocus
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">

                {availableWekkDays.map((weekDay, index) => {
                    return (

                        <Checkbox.Root
                            key={weekDay}
                            className='flex items-center gap-3 group'
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => {
                                //console.log('Selecinou o Dia!')
                                handleToggleWeekDay(index)
                            }}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>


                            </div>
                            <span className=' text-white leading-tight '>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}

            </div>

            <button type="submit"
                className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500"
            >
                <Check size={20} weight='bold' />
                Confirmar
            </button>
        </form>
    )
}