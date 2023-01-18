//passando as propriedades que o elemento pode receber.

interface HabitProps {
    completed: number
}

export function Habit(props: HabitProps){
    return(
        <div className="bg-slate-800 w-10 h-5 text-white text-center ">{props.completed}</div>
    )
}