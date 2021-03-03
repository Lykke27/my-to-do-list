import React, {useState, KeyboardEvent, ChangeEvent} from "react";

export type FilterValuesType = 'all' | 'active' | 'done'


type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const setAllFilter = () => {
        props.changeFilter("all")
    }
    const setActiveFilter = () => {
        props.changeFilter("active")
    }
    const setDoneFilter = () => {
        props.changeFilter("done")
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <input type="text" value={title}
                   onChange={updateInput}
                   onKeyPress={onKeyPressAddTask}
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id)
                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={setAllFilter}>All</button>
                <button onClick={setActiveFilter}>Active</button>
                <button onClick={setDoneFilter}>Done</button>
            </div>
        </div>
    )
}