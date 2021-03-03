import React from "react";

export type FilterValuesType = 'all' | 'active' | 'done'


type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask:(taskId:number) => void
    changeFilter:(filter:FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <input type="text"/> <span><button>Add</button></span>
            <ul>
                {
                    props.tasks.map(t => <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>x</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("done")}>Done</button>
            </div>
        </div>
    )
}