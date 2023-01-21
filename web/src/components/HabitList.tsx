import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { app } from '../lib/axios';

interface HabitsListProps {
    date: Date,
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>,
    completedHabits: string[]
}

export function HabitList({ date ,onCompletedChanged}: HabitsListProps) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        //console.log("Carregou!")
        app.get('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => {
            //console.log(response.data)
            setHabitsInfo(response.data)
        })
    }, [])

    //função para marcar e desmarcar
    async function handleToggleHabit(habitId: string) {
        await app.patch(`/habits/${habitId}/toggle`)

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            //remover da lista
            completedHabits = habitsInfo!.completedHabits.filter(id => id != habitId)

        } else {
            // adicionar a lista
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            // não substituir essa variável
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })

        onCompletedChanged(completedHabits.length)
    }

    //prevenindo datas já passadas.
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
    return (


        <div className='mt-6 flex flex-col gap-3'>
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                        disabled={isDateInPast}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>


                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500 '>
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}


        </div>
    )
}

